import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { IUser } from './user.interface';
import * as fs from 'fs';
import * as path from 'path';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  private readonly dataPath = path.join(process.cwd(), 'data', 'users.json');

  test(): string[] {
    return [];
  }

  findAll(): IUser[] {
    const rawData = fs.readFileSync(this.dataPath, 'utf-8');
    const users = JSON.parse(rawData) as IUser[];
    return users;
  }

  findOne(id: string, fields?: string[]) {
    try {
      const users = this.findAll();
      const user = users.find((u) => String(u.id) === id);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      if (fields) {
        const filteredUser: Partial<IUser> = {};

        fields.forEach((field) => {
          const key = field as keyof IUser;

          if (user[key] !== undefined) {
            filteredUser[key] = user[key] as never;
          }
        });

        return filteredUser;
      }

      return user;
    } catch {
      throw new InternalServerErrorException('Cannot process user data');
    }
  }

  create(createUserDto: CreateUserDto) {
    try {
      const filePath = path.join(process.cwd(), 'data', 'users.json');

      // 1. อ่านข้อมูล User ทั้งหมดที่มีอยู่เดิม (เรียกใช้ findAll ของเดิมได้เลย)
      const users = this.findAll();

      // 2. สร้าง ID ใหม่ (หา ID ที่มากที่สุดแล้วบวก 1)
      let maxId = 0;
      if (users.length > 0) {
        // ดึงเฉพาะ id มาแปลงเป็นตัวเลข แล้วหาค่า max
        const ids = users.map((u) => parseInt(String(u.id), 10));
        maxId = Math.max(...ids);
      }
      const newId = String(maxId + 1);

      // 3. นำข้อมูลจาก DTO มารวมกับ ID ใหม่
      const newUser = {
        id: newId,
        ...createUserDto,
      };

      // 4. นำ User ใหม่ไปต่อท้าย Array เดิม
      // (ใช้ as unknown as IUser เพื่อบอก Typescript ให้ยอมรับโครงสร้างนี้ไปก่อน)
      users.push(newUser as unknown as IUser);

      // 5. แปลง Array กลับเป็น JSON String แล้วเขียนทับลงไปในไฟล์
      // (ใส่ null, 2 เพื่อให้ JSON ในไฟล์จัดหน้าสวยงาม อ่านง่าย)
      fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf-8');

      // 6. ส่งข้อมูล User ที่เพิ่งสร้างเสร็จกลับไป
      return newUser;
    } catch {
      throw new InternalServerErrorException('Cannot create user');
    }
  }
}
