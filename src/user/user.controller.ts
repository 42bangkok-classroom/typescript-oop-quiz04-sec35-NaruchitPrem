import { Controller, Get, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { IUser } from './user.interface';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('test')
  test(): string[] {
    return this.userService.test();
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query('fields') fields?: string): any {
    let fieldsArray: string[] | undefined;

    if (fields) {
      fieldsArray = fields.split(',').map((field) => field.trim());
    }

    return this.userService.findOne(id, fieldsArray);
  }
}
