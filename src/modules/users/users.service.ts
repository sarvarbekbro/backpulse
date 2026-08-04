import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async create(dto: CreateUserDto): Promise< User>{
    const user = this.userRepository.create(dto)
    await this.userRepository.save(user)
    return user;
  }

  async findById(id: number): Promise< User | null>{
    const user = await this.userRepository.findOneBy({id})

    return user;
  }

  async findByEmail(email: string): Promise< User | null>{
    return  this.userRepository.findOneBy({email})
  }


}
