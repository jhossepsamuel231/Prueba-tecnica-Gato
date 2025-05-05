import { Account } from '../../../accounts/domain/entities/account.entity';

export interface IAuthRepository {
  validateCredentials(
    documentNumber: string,
    password: string,
  ): Promise<Account | null>;
}
