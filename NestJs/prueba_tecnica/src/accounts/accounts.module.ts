import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModel } from './infrastructure/repositories/account.model';
import { AccountRepository } from './infrastructure/repositories/account.repository';
import { AccountController } from './infrastructure/controllers/account.controller';
import { JwtStrategy } from 'src/shared/auth/strategies/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([AccountModel])],
  controllers: [AccountController],
  providers: [AccountRepository, JwtStrategy],
  exports: [AccountRepository],
})
export class AccountsModule {}
