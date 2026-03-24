import { Injectable, NotFoundException } from '@nestjs/common';
import { IUser } from './user.interface';
import * as fs from 'fs';
import * as path from 'path';

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
    const users = this.findAll();

    const user = users.find((u) => String(u.id) === String(id));

    // 2. ถ้าไม่พบ User ให้ throw NotFoundException (จะได้ 404 ทันที)
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // 3. ถ้าพบ User และมีการส่ง fields มา ให้ filter ข้อมูล
    if (fields && fields.length > 0) {
      const filteredUser = {};
      fields.forEach((field) => {
        const key = field.trim(); // กันกรณีมี space เช่น 'firstName, lastName'
        if (user[key] !== undefined) {
          filteredUser[key] = user[key];
        }
      });
      return filteredUser;
    }
  }
}
