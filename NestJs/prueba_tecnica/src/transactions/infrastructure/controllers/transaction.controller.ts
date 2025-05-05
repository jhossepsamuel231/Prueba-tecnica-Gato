import {
  Body,
  Controller,
  Post,
  Param,
  Get,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { DepositDto } from './dto/deposit.dto';
import { WithdrawDto } from './dto/withdraw.dto';
import { TransferDto } from './dto/transfer.dto';
import { DepositUseCase } from '../../../transactions/application/use-cases/deposit.use-case';
import { WithdrawUseCase } from '../../../transactions/application/use-cases/withdraw.use-case';
import { TransferUseCase } from '../../../transactions/application/use-cases/transfer.use-case';
import { TransactionRepository } from '../../infrastructure/repositories/transaction.repository';
import { AccountRepository } from '../../../accounts/infrastructure/repositories/account.repository';
import { GetTransactionsByAccountUseCase } from '../../../transactions/application/use-cases/get-transactions-by-account.use-case';
import { ApiResponseBuilder } from 'src/shared/utils/api-response.builder';
import { Auth } from 'src/shared/auth/decorators/auth.decorator';
import { ActiveUser } from 'src/shared/auth/decorators/active-user.decorator';
import { JwtPayload } from 'src/shared/auth/interfaces/jwt-payload.interface';

const messages = {
  deposit: 'Depósito realizado correctamente',
  withdraw: 'Retiro realizado correctamente',
  transfer: 'Transferencia realizada correctamente',
  history: 'Transacciones obtenidas correctamente',
};

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionController {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly accountRepository: AccountRepository,
  ) {}

  @Auth('USER')
  @Post('deposit')
  @ApiResponse({ status: 201, description: messages.deposit })
  async deposit(@Body() dto: DepositDto, @ActiveUser() user: JwtPayload) {
    if (dto.targetAccountId !== user.sub) {
      throw new UnauthorizedException(
        ApiResponseBuilder.error(403, 'No puedes depositar en cuentas ajenas'),
      );
    }

    const useCase = new DepositUseCase(
      this.transactionRepository,
      this.accountRepository,
    );

    const tx = await useCase.execute(dto.targetAccountId, dto.amount);
    return ApiResponseBuilder.success(201, messages.deposit, tx);
  }

  @Auth('USER')
  @Post('withdraw')
  @ApiResponse({ status: 201, description: messages.withdraw })
  async withdraw(@Body() dto: WithdrawDto, @ActiveUser() user: JwtPayload) {
    if (dto.sourceAccountId !== user.sub) {
      throw new UnauthorizedException(
        ApiResponseBuilder.error(
          403,
          'No puedes retirar de una cuenta que no es tuya',
        ),
      );
    }

    const useCase = new WithdrawUseCase(
      this.transactionRepository,
      this.accountRepository,
    );

    const tx = await useCase.execute(dto.sourceAccountId, dto.amount);
    return ApiResponseBuilder.success(201, messages.withdraw, tx);
  }

  @Auth('USER')
  @Post('transfer')
  @ApiResponse({ status: 201, description: messages.transfer })
  async transfer(@Body() dto: TransferDto, @ActiveUser() user: JwtPayload) {
    if (dto.sourceAccountId !== user.sub) {
      throw new UnauthorizedException(
        ApiResponseBuilder.error(403, 'Solo puedes transferir desde tu cuenta'),
      );
    }

    const useCase = new TransferUseCase(
      this.transactionRepository,
      this.accountRepository,
    );

    const tx = await useCase.execute(
      dto.sourceAccountId,
      dto.targetAccountId,
      dto.amount,
    );

    return ApiResponseBuilder.success(201, messages.transfer, tx);
  }

  @Auth('ADMIN', 'USER')
  @Get(':accountId')
  @ApiResponse({ status: 200, description: messages.history })
  async getByAccount(
    @Param('accountId') accountId: string,
    @ActiveUser() user: JwtPayload,
  ) {
    if (user.role === 'USER' && user.sub !== accountId) {
      throw new UnauthorizedException(
        ApiResponseBuilder.error(
          403,
          'No puedes ver transacciones de otra cuenta',
        ),
      );
    }

    const useCase = new GetTransactionsByAccountUseCase(
      this.transactionRepository,
    );

    const txs = await useCase.execute(accountId);
    return ApiResponseBuilder.success(200, messages.history, txs);
  }
}
