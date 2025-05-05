import { IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DepositDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  targetAccountId: string;

  @ApiProperty()
  @IsNumber()
  @Min(0.01)
  amount: number;
}
