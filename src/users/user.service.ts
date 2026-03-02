import { Injectable } from '@nestjs/common';

interface Users {
  id: number;
  name: string;
  age: number;
}

@Injectable()
export class UsersService {
  private readonly users: Users[] = [];


  test(): Users[] {
    return this.users;
  }
}
