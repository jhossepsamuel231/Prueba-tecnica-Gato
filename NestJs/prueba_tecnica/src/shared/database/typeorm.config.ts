import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AccountModel } from '../../accounts/infrastructure/repositories/account.model';
import { TransactionModel } from 'src/transactions/infrastructure/repositories/transaction.model';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: +process.env.DATABASE_PORT || 5432,
  username: process.env.DATABASE_USER || 'banco_user',
  password: process.env.DATABASE_PASSWORD || 'banco_pass',
  database: process.env.DATABASE_NAME || 'banco_db',
  entities: [AccountModel, TransactionModel],
  synchronize: true, // solo para desarrollo
};
