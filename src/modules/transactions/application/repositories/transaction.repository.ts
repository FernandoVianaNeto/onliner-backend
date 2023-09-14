import { Injectable } from '@nestjs/common';
import { TransactionRepositoryAdapter } from '../../adapter/repository-adapter/transaction.repository.adapter';

@Injectable()
export class TransactionRepository {
  constructor(
    private readonly transactionRepositoryAdapter: TransactionRepositoryAdapter,
  ) {}
}
