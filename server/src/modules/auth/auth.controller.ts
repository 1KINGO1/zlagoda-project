import {Body, Controller, Post, Res} from '@nestjs/common';
import { AuthService } from './auth.service';
import {LoginDto} from "./dto/Login.dto";
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res({passthrough: true}) res: Response) {
    return this.authService.login(loginDto, res);
  }

  @Post('logout')
  async logout(@Res({passthrough: true}) res: Response) {
    return this.authService.logout(res);
  }
}
