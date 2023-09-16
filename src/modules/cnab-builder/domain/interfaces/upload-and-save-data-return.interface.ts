import { Transaction } from '../../../transactions/domain/schema/transaction.schema';

export interface IUploadAndSaveDataResult {
  successfully: Transaction[];
  unsuccessfully: Transaction[];
}
