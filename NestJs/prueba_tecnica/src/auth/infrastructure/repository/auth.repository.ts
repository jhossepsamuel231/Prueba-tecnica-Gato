import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountModel } from '../../../accounts/infrastructure/repositories/account.model';
import { IAuthRepository } from '../../domain/interfaces/auth.repository.interface';
import { Account } from 'src/accounts/domain/entities/account.entity';

@Injectable()
export class AuthService implements IAuthRepository {
  constructor(
    @InjectRepository(AccountModel)
    private readonly repo: Repository<AccountModel>,
  ) {}

  async validateCredentials(
    documentNumber: string,
    password: string,
  ): Promise<Account | null> {
    const found = await this.repo.findOneBy({ documentNumber });
    if (!found || found.password !== password) return null;

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
}
