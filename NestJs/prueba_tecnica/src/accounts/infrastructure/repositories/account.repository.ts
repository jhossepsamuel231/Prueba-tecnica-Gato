import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountModel } from './account.model';
import { Repository } from 'typeorm';
import { IAccountRepository } from '../../domain/interfaces/account.repository.interface';
import { Account } from '../../domain/entities/account.entity';

@Injectable()
export class AccountRepository implements IAccountRepository {
  constructor(
    @InjectRepository(AccountModel)
    private readonly repo: Repository<AccountModel>,
  ) {}

  async create(account: Account): Promise<Account> {
    const model = this.repo.create(account);
    const saved = await this.repo.save(model);
    return new Account(
      saved.id,
      saved.holderName,
      saved.documentNumber,
      saved.accountType,
      +saved.balance,
      saved.password,
      saved.role,
      saved.createdAt,
    );
  }

  async findById(id: string): Promise<Account | null> {
    const found = await this.repo.findOneBy({ id });
    if (!found) return null;
    return new Account(
      found.id,
      found.holderName,
      found.documentNumber,
      found.accountType,
      +found.balance,
      found.password,
      found.role,
      found.createdAt,
    );
  }

  async findAll(): Promise<Account[]> {
    const all = await this.repo.find();
    return all.map(
      (acc) =>
        new Account(
          acc.id,
          acc.holderName,
          acc.documentNumber,
          acc.accountType,
          +acc.balance,
          acc.password,
          acc.role,
          acc.createdAt,
        ),
    );
  }
}
