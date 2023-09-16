import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTransactionDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    name: 'type',
    type: Number,
    description: 'transaction type',
    example: 1,
    required: true,
  })
  type: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'date',
    type: String,
    description: 'transaction date',
    example: '20230902',
    required: true,
  })
  date: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    name: 'value',
    type: Number,
    description: 'transaction value',
    example: 123,
    required: true,
  })
  value: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'document',
    type: String,
    description: 'document',
    example: '08567822234',
    required: true,
  })
  document: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'card',
    type: String,
    description: 'card type',
    example: '1',
    required: true,
  })
  card: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'storeOwner',
    type: String,
    description: 'store owner transaction',
    example: 'Fernando',
    required: true,
  })
  storeOwner: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'store name where the transaction was made',
    example: 1,
    required: true,
  })
  storeName: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    name: 'success',
    type: Boolean,
    description: 'if the transaction was succeded or not',
    example: false,
    required: false,
  })
  success?: boolean;

  @IsString()
  @IsOptional()
  @ApiProperty({
    name: 'errorMessage',
    type: String,
    description: 'error message',
    example: 'Document must be a valid cpf',
    required: false,
  })
  errorMessage?: string;
}
