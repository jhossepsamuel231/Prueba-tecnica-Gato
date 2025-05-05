import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsModule } from './accounts/accounts.module';
import { typeOrmConfig } from './shared/database/typeorm.config';
import { TransactionsModule } from './transactions/transactions.module';
import { AccountModel } from './accounts/infrastructure/repositories/account.model';
import { TransactionModel } from './transactions/infrastructure/repositories/transaction.model';
import { SeederService } from './shared/seeder/seeder.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { LogRequestMiddleware } from './shared/middlewares/log-request.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([AccountModel, TransactionModel]),
    AccountsModule,
    TransactionsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [SeederService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogRequestMiddleware).forRoutes('*');
  }
}
