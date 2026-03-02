import { Controller, Get } from '@nestjs/common';
import { UsersService } from './user.service';
import { Users } from './user.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  test(): Users[] {
    return this.usersService.test();
  }
}
