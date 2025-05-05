import { IAccountRepository } from '../../domain/interfaces/account.repository.interface';
import { Account } from '../../domain/entities/account.entity';

export class GetAccountByIdUseCase {
  constructor(private readonly accountRepo: IAccountRepository) {}

  async execute(id: string): Promise<Account | null> {
    return this.accountRepo.findById(id);
  }
}
