import { ApiProperty } from '@nestjs/swagger';
import {
  transactionSuccessfullyStub,
  transactionUnsuccessfullyStub,
} from '../../../transactions/__mocks__/stub/transaction.stub';
import { Transaction } from '../../../transactions/domain/schema/transaction.schema';

export class UploadAndSaveDataReturnDto {
  @ApiProperty({
    type: Array,
    example: [transactionSuccessfullyStub()],
  })
  successfully: Transaction[];

  @ApiProperty({
    type: Array,
    example: [transactionUnsuccessfullyStub()],
  })
  unsuccessfully: Transaction[];
}
