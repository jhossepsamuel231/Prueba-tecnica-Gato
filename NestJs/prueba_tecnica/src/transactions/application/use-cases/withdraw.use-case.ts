import { ITransactionRepository } from '../../domain/interfaces/transaction.repository.interface';
import {
  Transaction,
  TransactionType,
} from '../../domain/entities/transaction.entity';
import { IAccountRepository } from '../../../accounts/domain/interfaces/account.repository.interface';
import { v4 as uuidv4 } from 'uuid';

export class WithdrawUseCase {
  constructor(
    private readonly transactionRepo: ITransactionRepository,
    private readonly accountRepo: IAccountRepository,
  ) {}

  async execute(sourceAccountId: string, amount: number): Promise<Transaction> {
    const account = await this.accountRepo.findById(sourceAccountId);
    if (!account) {
      throw new Error('Cuenta origen no encontrada');
    }

    if (account.balance < amount) {
      throw new Error('Saldo insuficiente');
    }

    account.balance -= amount;
    await this.accountRepo.create(account);

    const transaction = new Transaction(
      uuidv4(),
      TransactionType.WITHDRAW,
      amount,
      sourceAccountId,
      null,
      new Date(),
    );

    return this.transactionRepo.save(transaction);
  }
}
