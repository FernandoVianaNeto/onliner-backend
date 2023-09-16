import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FindTransactionDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    name: 'storeName',
    type: String,
    default: '',
    example: 'Store name Example',
    description: 'store name',
    required: true,
  })
  storeName?: string;
}
