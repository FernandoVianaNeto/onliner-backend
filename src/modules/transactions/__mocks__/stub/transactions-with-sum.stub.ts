import { ITransactionSum } from '../../domain/interfaces/transactions-sum';
import * as mongoose from 'mongoose';

export const transactionsWithSumStub = (): ITransactionSum => {
  return {
    name: 'ADEGA PEREIRA',
    total: 1212,
    transactions: [
      {
        _id: new mongoose.Types.ObjectId('6504e67b8a56b122cfff1039'),
        type: 2,
        date: '20230102',
        value: 122,
        document: '19551496078',
        card: '4648****0099',
        storeOwner: 'AFONSO PEREIRA',
        storeName: 'ADEGA PEREIRA',
        success: true,
      },
    ],
  };
};
