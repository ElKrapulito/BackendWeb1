import { Controller, Post, Request, UseGuards, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly authService:AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req){
    return await this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('test')
  getTest(@Request() req){
    return req.user;
  }

}
