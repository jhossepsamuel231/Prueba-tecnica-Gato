import { Controller, Post, Body } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../repository/auth.repository';
import { LoginDto } from './dto/login.dto';
import { LoginUseCase } from 'src/auth/application/use-cases/login.use-case';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const useCase = new LoginUseCase(this.authService, this.jwtService);
    const token = await useCase.execute(dto.documentNumber, dto.password);
    return {
      status: 'success',
      code: 200,
      message: 'Login exitoso',
      data: { token },
    };
  }
}
