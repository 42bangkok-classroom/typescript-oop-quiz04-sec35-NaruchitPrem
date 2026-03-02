import { Controller, Get } from '@nestjs/common';
import { UsersService } from './user.service';

interface Users {
  id: number;
  name: string;
  age: number;
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  test(): Users[] {
    return this.usersService.test();
  }
}