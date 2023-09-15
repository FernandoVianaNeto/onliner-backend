import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionsController } from './adapter/controllers/transactions.controller';
import { TransactionRepositoryAdapter } from './adapter/repository-adapter/transaction.repository.adapter';
import { TransactionRepository } from './application/repositories/transaction.repository';
import { TransactionsService } from './application/services/transactions.service';
import {
  Transaction,
  TransactionSchema,
} from './domain/schema/transaction.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Transaction.name,
        schema: TransactionSchema,
      },
    ]),
  ],
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    TransactionRepository,
    TransactionRepositoryAdapter,
  ],
  exports: [
    TransactionsService,
    TransactionRepository,
    TransactionRepositoryAdapter,
  ],
})
export class TransactionsModule {}
