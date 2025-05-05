import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { AccountType, RoleEnum } from '../../../domain/entities/account.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  holderName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  documentNumber: string;

  @ApiProperty({ enum: AccountType })
  @IsEnum(AccountType)
  accountType: AccountType;

  @ApiProperty()
  @IsString()
  @MinLength(4)
  password: string;

  @ApiProperty({ enum: RoleEnum, required: false })
  @IsEnum(RoleEnum)
  @IsOptional()
  role?: RoleEnum;
}
