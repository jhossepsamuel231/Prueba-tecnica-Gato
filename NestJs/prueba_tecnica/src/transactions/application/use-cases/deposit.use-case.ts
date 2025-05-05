import { ITransactionRepository } from '../../domain/interfaces/transaction.repository.interface';
import {
  Transaction,
  TransactionType,
} from '../../domain/entities/transaction.entity';
import { IAccountRepository } from '../../../accounts/domain/interfaces/account.repository.interface';
import { v4 as uuidv4 } from 'uuid';

export class DepositUseCase {
  constructor(
    private readonly transactionRepo: ITransactionRepository,
    private readonly accountRepo: IAccountRepository,
  ) {}

  async execute(targetAccountId: string, amount: number): Promise<Transaction> {
    const account = await this.accountRepo.findById(targetAccountId);
    if (!account) {
      throw new Error('Cuenta destino no encontrada');
    }

    // Actualizar saldo
    account.balance += amount;
    await this.accountRepo.create(account); // sobrescribe con el nuevo balance

    const transaction = new Transaction(
      uuidv4(),
      TransactionType.DEPOSIT,
      amount,
      null,
      targetAccountId,
      new Date(),
    );

    return this.transactionRepo.save(transaction);
  }
}
