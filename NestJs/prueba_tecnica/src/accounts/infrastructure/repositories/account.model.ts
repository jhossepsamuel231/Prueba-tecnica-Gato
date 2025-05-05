import { Column, Entity, PrimaryColumn } from 'typeorm';
import {
  AccountType,
  RoleEnum,
} from '../../../accounts/domain/entities/account.entity';

@Entity({ name: 'accounts' })
export class AccountModel {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'holder_name' })
  holderName: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({
    type: 'enum',
    enum: RoleEnum,
    default: RoleEnum.USER,
  })
  role: RoleEnum;

  @Column({ name: 'document_number', unique: true })
  documentNumber: string;

  @Column({ type: 'enum', enum: AccountType })
  accountType: AccountType;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  balance: number;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
