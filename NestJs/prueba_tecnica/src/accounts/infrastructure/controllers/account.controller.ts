import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { CreateAccountDto } from './dto/create-account.dto';
import { AccountRepository } from '../../infrastructure/repositories/account.repository';
import { CreateAccountUseCase } from '../../../accounts/application/use-cases/create-account.use-case';
import { GetAllAccountsUseCase } from '../../../accounts/application/use-cases/get-all-accounts.use-case';
import { GetAccountByIdUseCase } from '../../../accounts/application/use-cases/get-account-by-id.use-case';
import { ApiResponseBuilder } from 'src/shared/utils/api-response.builder';
import { ActiveUser } from 'src/shared/auth/decorators/active-user.decorator';
import { Auth } from 'src/shared/auth/decorators/auth.decorator';
import { JwtPayload } from 'src/shared/auth/interfaces/jwt-payload.interface';

const messages = {
  created: 'Cuenta creada correctamente',
  listed: 'Cuentas obtenidas correctamente',
  found: 'Cuenta obtenida correctamente',
  notFound: 'Cuenta no encontrada',
};

@ApiTags('Accounts')
@Controller('accounts')
export class AccountController {
  constructor(private readonly accountRepository: AccountRepository) {}

  // ✅ Registro de cuentas: Libre acceso
  @Post()
  @ApiResponse({
    status: 201,
    description: messages.created,
  })
  async create(@Body() dto: CreateAccountDto) {
    const useCase = new CreateAccountUseCase(this.accountRepository);

    const account = await useCase.execute({
      holderName: dto.holderName,
      documentNumber: dto.documentNumber,
      accountType: dto.accountType,
      password: dto.password,
      role: dto.role,
    });

    return ApiResponseBuilder.success(201, messages.created, account);
  }

  // ✅ Ver todas las cuentas: Solo ADMIN
  @Get()
  @Auth('ADMIN')
  @ApiResponse({
    status: 200,
    description: messages.listed,
  })
  async findAll() {
    const useCase = new GetAllAccountsUseCase(this.accountRepository);
    const accounts = await useCase.execute();

    return ApiResponseBuilder.success(200, messages.listed, accounts);
  }

  @Get(':id')
  @Auth('ADMIN', 'USER')
  @ApiResponse({ status: 200, description: messages.found })
  @ApiResponse({ status: 404, description: messages.notFound })
  async findById(@Param('id') id: string, @ActiveUser() user: JwtPayload) {
    if (user.role === 'USER' && user.sub !== id) {
      throw new UnauthorizedException(
        ApiResponseBuilder.error(403, 'No puedes acceder a esta cuenta'),
      );
    }

    const useCase = new GetAccountByIdUseCase(this.accountRepository);
    const account = await useCase.execute(id);

    if (!account) {
      throw new NotFoundException(
        ApiResponseBuilder.error(404, messages.notFound),
      );
    }

    return ApiResponseBuilder.success(200, messages.found, account);
  }
}
