import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from '../../domain/dto/create-transaction.dto';
import { FindTransactionDto } from '../../domain/dto/find-transaction.dto';
import { Transaction } from '../../domain/schema/transaction.schema';
import { TransactionRepository } from '../repositories/transaction.repository';

@Injectable()
export class TransactionsService {
  constructor(private transactionRepository: TransactionRepository) {}

  async create(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    return this.transactionRepository.create(createTransactionDto);
  }

  async find(findTransactionDto: FindTransactionDto) {
    return this.transactionRepository.findAndSumTotalByStoreName(
      findTransactionDto,
    );
  }
}
