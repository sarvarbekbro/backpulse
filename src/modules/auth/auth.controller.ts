import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { JwtAuthGuard } from './guards/jwt.auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto)
  }

  @Post('/signin')
  async signin(@Body() dto: SigninDto){
    return this.authService.signin(dto)
  }
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile(@CurrentUser() user: User){
    return user
  }
}
