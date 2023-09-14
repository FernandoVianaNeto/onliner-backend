import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from '../../domain/dto/create-transaction.dto';
import { TransactionRepository } from '../repositories/transaction.repository';

@Injectable()
export class TransactionsService {
  constructor(private transactionRepository: TransactionRepository) {}

  async create(createTransactionDto: CreateTransactionDto) {}
}
