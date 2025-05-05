import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { TransactionType } from '../../../transactions/domain/entities/transaction.entity';

@Entity({ name: 'transactions' })
export class TransactionModel {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'enum', enum: TransactionType })
  type: TransactionType;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount: number;

  @Column({ name: 'source_account_id', nullable: true })
  sourceAccountId: string;

  @Column({ name: 'target_account_id', nullable: true })
  targetAccountId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
