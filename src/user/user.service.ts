import { Injectable } from '@nestjs/common';
import { IUser } from './user.interface'
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
}
