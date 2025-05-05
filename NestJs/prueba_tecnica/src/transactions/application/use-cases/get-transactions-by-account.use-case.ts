import { ITransactionRepository } from '../../domain/interfaces/transaction.repository.interface';
import { Transaction } from '../../domain/entities/transaction.entity';

export class GetTransactionsByAccountUseCase {
  constructor(private readonly transactionRepo: ITransactionRepository) {}

  async execute(accountId: string): Promise<Transaction[]> {
    return this.transactionRepo.findByAccountId(accountId);
  }
}
