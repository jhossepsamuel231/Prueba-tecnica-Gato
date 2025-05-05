import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionModel } from './transaction.model';
import { ITransactionRepository } from '../../domain/interfaces/transaction.repository.interface';
import { Transaction } from '../../domain/entities/transaction.entity';

@Injectable()
export class TransactionRepository implements ITransactionRepository {
  constructor(
    @InjectRepository(TransactionModel)
    private readonly repo: Repository<TransactionModel>,
  ) {}

  async save(transaction: Transaction): Promise<Transaction> {
    const model = this.repo.create(transaction);
    const saved = await this.repo.save(model);
    return new Transaction(
      saved.id,
      saved.type,
      +saved.amount,
      saved.sourceAccountId,
      saved.targetAccountId,
      saved.createdAt,
    );
  }

  async findByAccountId(accountId: string): Promise<Transaction[]> {
    const all = await this.repo.find({
      where: [{ sourceAccountId: accountId }, { targetAccountId: accountId }],
    });

    return all.map(
      (tx) =>
        new Transaction(
          tx.id,
          tx.type,
          +tx.amount,
          tx.sourceAccountId,
          tx.targetAccountId,
          tx.createdAt,
        ),
    );
  }
}
