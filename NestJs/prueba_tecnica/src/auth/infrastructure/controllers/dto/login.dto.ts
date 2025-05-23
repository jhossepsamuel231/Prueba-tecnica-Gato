import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  documentNumber: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}
