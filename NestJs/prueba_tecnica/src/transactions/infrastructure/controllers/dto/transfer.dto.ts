import { IsNotEmpty, IsUUID, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TransferDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  sourceAccountId: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  targetAccountId: string;

  @ApiProperty()
  @IsNumber()
  @Min(0.01)
  amount: number;
}
