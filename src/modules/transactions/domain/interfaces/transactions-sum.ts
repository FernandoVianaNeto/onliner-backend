import { Transaction } from '../schema/transaction.schema';

export interface ITransactionSum {
  _id: string;
  total: number;
  transactions: Transaction[];
}
