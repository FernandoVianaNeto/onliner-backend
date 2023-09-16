import { Transaction } from '../../domain/schema/transaction.schema';
import * as mongoose from 'mongoose';

export const transactionSuccessfullyStub = (): Transaction => {
  return {
    type: 3,
    date: '20230102',
    value: 151,
    document: '19551496078',
    card: '1753****3153',
    storeOwner: 'AFONSO PEREIRA',
    storeName: 'ADEGA PEREIRA',
    success: true,
    _id: new mongoose.Types.ObjectId('6504f21ce4a26b5e87591f1e'),
  };
};

export const transactionUnsuccessfullyStub = (): Transaction => {
  return {
    type: 3,
    date: '20230102',
    value: 151,
    document: '19551496078',
    card: '1753****3153',
    storeOwner: 'AFONSO PEREIRA',
    storeName: 'ADEGA PEREIRA',
    success: false,
    _id: new mongoose.Types.ObjectId('6504f21ce4a26b5e87591f1e'),
  };
};
