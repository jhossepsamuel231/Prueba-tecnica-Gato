import { IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class WithdrawDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  sourceAccountId: string;

  @ApiProperty()
  @IsNumber()
  @Min(0.01)
  amount: number;
}
