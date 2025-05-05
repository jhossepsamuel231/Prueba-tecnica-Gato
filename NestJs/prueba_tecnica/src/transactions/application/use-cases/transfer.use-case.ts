import { ITransactionRepository } from '../../domain/interfaces/transaction.repository.interface';
import { IAccountRepository } from '../../../accounts/domain/interfaces/account.repository.interface';
import {
  Transaction,
  TransactionType,
} from '../../domain/entities/transaction.entity';
import { v4 as uuidv4 } from 'uuid';

export class TransferUseCase {
  constructor(
    private readonly transactionRepo: ITransactionRepository,
    private readonly accountRepo: IAccountRepository,
  ) {}

  async execute(
    sourceId: string,
    targetId: string,
    amount: number,
  ): Promise<Transaction> {
    if (sourceId === targetId) {
      throw new Error('No se puede transferir a la misma cuenta');
    }

    const sourceAccount = await this.accountRepo.findById(sourceId);
    const targetAccount = await this.accountRepo.findById(targetId);

    if (!sourceAccount || !targetAccount) {
      throw new Error('Cuenta origen o destino no encontrada');
    }

    if (sourceAccount.balance < amount) {
      throw new Error('Saldo insuficiente');
    }

    sourceAccount.balance -= amount;
    targetAccount.balance += amount;

    await this.accountRepo.create(sourceAccount);
    await this.accountRepo.create(targetAccount);

    const transaction = new Transaction(
      uuidv4(),
      TransactionType.TRANSFER,
      amount,
      sourceId,
      targetId,
      new Date(),
    );

    return this.transactionRepo.save(transaction);
  }
}
