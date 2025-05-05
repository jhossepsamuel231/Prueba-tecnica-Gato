import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionModel } from './infrastructure/repositories/transaction.model';
import { TransactionRepository } from './infrastructure/repositories/transaction.repository';
import { TransactionController } from './infrastructure/controllers/transaction.controller';
import { AccountModel } from '../accounts/infrastructure/repositories/account.model';
import { AccountRepository } from '../accounts/infrastructure/repositories/account.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionModel, AccountModel])],
  controllers: [TransactionController],
  providers: [TransactionRepository, AccountRepository],
})
export class TransactionsModule {}
