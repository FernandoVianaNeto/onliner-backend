import { Injectable } from '@nestjs/common';
import { TransactionRepositoryAdapter } from '../../adapter/repository-adapter/transaction.repository.adapter';
import { CreateTransactionDto } from '../../domain/dto/create-transaction.dto';
import { FindTransactionDto } from '../../domain/dto/find-transaction.dto';
import { ITransactionSum } from '../../domain/interfaces/transactions-sum';
import { Transaction } from '../../domain/schema/transaction.schema';

@Injectable()
export class TransactionRepository {
  constructor(
    private readonly transactionRepositoryAdapter: TransactionRepositoryAdapter,
  ) {}

  async create(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    return this.transactionRepositoryAdapter.create(createTransactionDto);
  }

  async findAndSumTotalByStoreName(
    findTransactionDto: FindTransactionDto,
  ): Promise<ITransactionSum> {
    return this.transactionRepositoryAdapter.findAndSumTotalByStoreName(
      findTransactionDto,
    );
  }

  async findUnsuccessfullyTransactions(
    findTransactionDto: FindTransactionDto,
  ): Promise<Transaction[]> {
    return this.transactionRepositoryAdapter.findUnsuccessfullyTransactions(
      findTransactionDto,
    );
  }
}
