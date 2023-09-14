import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../../../../infrastructure/mongo/database/entity.repository';
import {
  Transaction,
  TransactionDocument,
} from '../../domain/schema/transaction.schema';

@Injectable()
export class TransactionRepositoryAdapter extends EntityRepository<TransactionDocument> {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
  ) {
    super(transactionModel);
  }
}
