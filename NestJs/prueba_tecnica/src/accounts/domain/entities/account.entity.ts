export enum AccountType {
  SAVINGS = 'SAVINGS',
  CHECKING = 'CHECKING',
}

export enum RoleEnum {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export class Account {
  constructor(
    public id: string,
    public holderName: string,
    public documentNumber: string,
    public accountType: AccountType,
    public balance: number,
    public password: string,
    public role: RoleEnum,
    public createdAt: Date,
  ) {}
}
