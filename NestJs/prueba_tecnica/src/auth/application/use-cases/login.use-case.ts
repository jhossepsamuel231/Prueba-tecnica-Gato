import { IAuthRepository } from '../../domain/interfaces/auth.repository.interface';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

export class LoginUseCase {
  constructor(
    private readonly authRepo: IAuthRepository,
    private readonly jwt: JwtService,
  ) {}

  async execute(documentNumber: string, password: string): Promise<string> {
    const user = await this.authRepo.validateCredentials(
      documentNumber,
      password,
    );
    if (!user) throw new UnauthorizedException('Credenciales inválidas');

    const payload = {
      sub: user.id,
      role: user.role,
      documentNumber: user.documentNumber,
    };

    return this.jwt.signAsync(payload);
  }
}
