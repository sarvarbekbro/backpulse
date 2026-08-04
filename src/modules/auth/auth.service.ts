import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor (private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}
  async  signup(dto: SignupDto){
    const existingUser = await this.usersService.findByEmail(dto.email)
    if(existingUser){
      throw new ConflictException('Email is already in use')
    }
    const hashedPassword = await this.hashPassword(dto.password)
    const user = await this.usersService.create({
      email: dto.email,
      password: hashedPassword
    })
    const payload = {
      sub: user.id,
      email: user.email
    };
    const accessToken = await this.jwtService.signAsync(payload)
    return {
      accessToken, user
    }
  }

  async signin(dto: SigninDto) {
    const user = await this.usersService.findByEmail(dto.email)
    if(!user)
    {
      throw new UnauthorizedException('Invalid email or password')
    }
    const isPasswordValid = await this.comparePassword(dto.password, user.password)
    if(!isPasswordValid)
    {
      throw new UnauthorizedException('Invalid email or password')
    }
    const payload = {
      sub: user.id,
      email: user.email
    };
    const accessToken = await this.jwtService.signAsync(payload)
    return {
      accessToken, user
    }
  }
   private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

   private async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
  
}
