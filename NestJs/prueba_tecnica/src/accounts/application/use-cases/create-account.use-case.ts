import { IAccountRepository } from '../../domain/interfaces/account.repository.interface';
import {
  Account,
  AccountType,
  RoleEnum,
} from '../../domain/entities/account.entity';
import { v4 as uuidv4 } from 'uuid';

export class CreateAccountUseCase {
  constructor(private readonly accountRepo: IAccountRepository) {}

  async execute(data: {
    holderName: string;
    documentNumber: string;
    accountType: AccountType;
    password: string;
    role?: RoleEnum;
  }): Promise<Account> {
    const account = new Account(
      uuidv4(),
      data.holderName,
      data.documentNumber,
      data.accountType,
      0,
      data.password,
      data.role ?? RoleEnum.USER,
      new Date(),
    );

    return this.accountRepo.create(account);
  }
}
