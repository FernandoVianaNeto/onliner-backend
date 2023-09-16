import {
  transactionSuccessfullyStub,
  transactionUnsuccessfullyStub,
} from '../../../transactions/__mocks__/stub/transaction.stub';
import { IUploadAndSaveDataResult } from '../../domain/interfaces/upload-and-save-data-return.interface';

export const uploadAndSaveDataStub = (): IUploadAndSaveDataResult => {
  return {
    successfully: [transactionSuccessfullyStub()],
    unsuccessfully: [transactionUnsuccessfullyStub()],
  };
};
