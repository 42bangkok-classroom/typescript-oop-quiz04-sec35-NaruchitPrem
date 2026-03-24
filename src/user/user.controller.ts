import { Controller, Get, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';

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
  findOne(
    @Param('id') id: string,
    @Query('fields') fields?: string, // รับเป็น String ก่อน เช่น 'firstName,lastName'
  ) {
    // แปลง String ที่มี comma กั้น ให้กลายเป็น Array
    // ถ้าไม่มีการส่ง fields มา จะให้ค่าเป็น undefined
    const fieldsArray = fields ? fields.split(',') : undefined;

    // เรียกใช้งาน Service พร้อมส่งตัวแปรไป
    return this.userService.findOne(id, fieldsArray);
  }
}
