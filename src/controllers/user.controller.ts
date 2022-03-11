import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../schemas/user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post()
  // create(@Body() createUserDto: CreateUserDto): Promise<User> {
  //   console.log(' create user', createUserDto);
  //   return this.userService.create(
  //     createUserDto.name,
  //     createUserDto.age,
  //     createUserDto.email,
  //   );
  // }

  @Get()
  findAll(): Promise<User[]> {
    console.log(' findAll user');
    return this.userService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string): Promise<User> {
    console.log(' findOne user');
    return this.userService.findOne(name);
  }
}
