import { IAccountRepository } from '../../domain/interfaces/account.repository.interface';
import { Account } from '../../domain/entities/account.entity';

export class GetAllAccountsUseCase {
  constructor(private readonly accountRepo: IAccountRepository) {}

  async execute(): Promise<Account[]> {
    return this.accountRepo.findAll();
  }
}
