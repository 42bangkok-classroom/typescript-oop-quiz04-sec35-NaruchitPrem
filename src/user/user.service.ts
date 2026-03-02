import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly users: string[] = [];

  test(): string[] {
    return this.users;
  }
}
