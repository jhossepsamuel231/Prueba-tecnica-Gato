import { Account } from '../entities/account.entity';

export interface IAccountRepository {
  create(account: Account): Promise<Account>;
  findById(id: string): Promise<Account | null>;
  findAll(): Promise<Account[]>;
}
