import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModel } from '../accounts/infrastructure/repositories/account.model';
import { AuthService } from './infrastructure/repository/auth.repository';
import { RolesGuard } from 'src/shared/auth/guards/roles.guard';
import { JwtStrategy } from 'src/shared/auth/strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([AccountModel]),
    JwtModule.register({
      secret: 'jwt_secret_key',
      signOptions: { expiresIn: '2h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RolesGuard],
})
export class AuthModule {}
