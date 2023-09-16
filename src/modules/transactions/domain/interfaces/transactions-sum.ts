import { Transaction } from '../schema/transaction.schema';

export interface ITransactionSum {
  name: string;
  total: number;
  transactions: Transaction[];
}
