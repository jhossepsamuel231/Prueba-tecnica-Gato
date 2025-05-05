import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AccountType,
  RoleEnum,
} from 'src/accounts/domain/entities/account.entity';
import { AccountModel } from 'src/accounts/infrastructure/repositories/account.model';
import { TransactionType } from 'src/transactions/domain/entities/transaction.entity';
import { TransactionModel } from 'src/transactions/infrastructure/repositories/transaction.model';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(AccountModel)
    private readonly accountRepo: Repository<AccountModel>,

    @InjectRepository(TransactionModel)
    private readonly transactionRepo: Repository<TransactionModel>,
  ) {}

  async run() {
    const existing = await this.accountRepo.find();
    if (existing.length > 0) {
      console.log('[Seeder] Ya existen cuentas, seeder omitido.');
      return;
    }

    console.log('[Seeder] Insertando datos de prueba...');

    const accounts = await this.accountRepo.save([
      {
        id: uuidv4(),
        holderName: 'Josue Dominguez',
        documentNumber: '12345678',
        accountType: AccountType.SAVINGS,
        balance: 5000,
        password: '1234',
        role: RoleEnum.ADMIN,
      },
      {
        id: uuidv4(),
        holderName: 'Ana Torres',
        documentNumber: '87654321',
        accountType: AccountType.CHECKING,
        balance: 3000,
        password: 'abcd',
        role: RoleEnum.USER,
      },
    ]);

    await this.transactionRepo.save([
      {
        id: uuidv4(),
        type: TransactionType.DEPOSIT,
        amount: 5000,
        sourceAccountId: null,
        targetAccountId: accounts[0].id,
        createdAt: new Date(),
      },
      {
        id: uuidv4(),
        type: TransactionType.TRANSFER,
        amount: 1000,
        sourceAccountId: accounts[0].id,
        targetAccountId: accounts[1].id,
        createdAt: new Date(),
      },
    ]);

    console.log('[Seeder] ¡Datos insertados con éxito!');
  }
}
