import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    console.log(' create user');
    return this.userService.create(createUserDto);
  }

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
