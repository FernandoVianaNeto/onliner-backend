import { IsOptional, IsString } from 'class-validator';

export class FindTransactionDto {
  @IsString()
  @IsOptional()
  storeName?: string;
}
