import { ApiProperty } from '@nestjs/swagger';
import { transactionSuccessfullyStub } from '../../__mocks__/stub/transaction.stub';
import { Transaction } from '../schema/transaction.schema';

export class SumTotalByStoreNameDto {
  @ApiProperty({
    type: String,
    name: 'name',
    example: 'ADEGA PEREIRA',
  })
  name: string;

  @ApiProperty({
    type: Number,
    name: 'total',
    example: 1234,
  })
  total: number;

  @ApiProperty({
    type: Array,
    name: 'transaction',
    example: [transactionSuccessfullyStub()],
  })
  transaction: Transaction[];
}
