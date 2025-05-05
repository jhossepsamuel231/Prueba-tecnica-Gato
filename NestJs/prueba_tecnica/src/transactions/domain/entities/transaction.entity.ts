export enum TransactionType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAW = 'WITHDRAW',
  TRANSFER = 'TRANSFER',
}

export class Transaction {
  constructor(
    public id: string,
    public type: TransactionType,
    public amount: number,
    public sourceAccountId: string | null,
    public targetAccountId: string | null,
    public createdAt: Date,
  ) {}
}
