import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
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

  findOne(id: string, fields?: string[]): any {
    try {
      const users = this.findAll();
      const user = users.find((u) => String(u.id) === id);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      if (fields && fields.length > 0) {
        const filteredUser: any = {};
        fields.forEach((field) => {
          if (user[field] !== undefined) {
            filteredUser[field] = user[field];
          }
        });
        return filteredUser;
      }

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Cannot process user data');
    }
  }
}
