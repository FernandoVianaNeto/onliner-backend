import { Injectable } from '@nestjs/common';
import { TransactionRepositoryAdapter } from '../../adapter/repository-adapter/transaction.repository.adapter';
import { CreateTransactionDto } from '../../domain/dto/create-transaction.dto';
import { FindTransactionDto } from '../../domain/dto/find-transaction.dto';
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

  async findAndSumTotalByStoreName(findTransactionDto: FindTransactionDto) {
    return this.transactionRepositoryAdapter.findAndSumTotalByStoreName(
      findTransactionDto,
    );
  }
}
