import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService){}
  @Post()
  create(@Body() dto: CreateUserDto){
 return this.usersService.create(dto)
  }
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number){
    return this.usersService.findById(id)
  }
  @Get()
  findByEmail(@Param('email') email: string){
    return this.usersService.findByEmail(email)
  }
}
