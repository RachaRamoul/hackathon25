import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CurrentServiceProvider } from 'src/common/decorators/current-service-provider.decorator';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { Public } from './decorators/public.decorator';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const serviceProvider = await this.authService.validateServiceProvider(
      loginDto.email,
      loginDto.password,
    );
    return this.authService.login(serviceProvider);
  }

  @Public()
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Get('me')
  getAuthInfo(@CurrentServiceProvider() serviceProvider: JwtPayload) {
    return {
      id: serviceProvider.id,
      email: serviceProvider.email,
    };
  }
}
