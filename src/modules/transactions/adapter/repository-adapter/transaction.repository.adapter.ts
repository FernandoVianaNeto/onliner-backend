import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../../../../infrastructure/mongo/database/entity.repository';
import { FindTransactionDto } from '../../domain/dto/find-transaction.dto';
import {
  Transaction,
  TransactionDocument,
} from '../../domain/schema/transaction.schema';
import * as _ from 'lodash';

@Injectable()
export class TransactionRepositoryAdapter extends EntityRepository<TransactionDocument> {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
  ) {
    super(transactionModel);
  }

  async findAndSumTotalByStoreName(findTransactionDto: FindTransactionDto) {
    const { storeName } = findTransactionDto;

    const matchFilter = {
      ...(!_.isUndefined(storeName) && { storeName: { $regex: storeName } }),
    };

    const aggregateByStoreName = await this.aggregate([
      {
        $match: matchFilter,
      },
      {
        $group: {
          _id: '$storeName',
          total: { $sum: '$value' },
          transactions: { $push: '$$ROOT' },
        },
      },
    ]);

    const totalFixed = aggregateByStoreName.map((item) => {
      return {
        ...item,
        total: Number(item.total.toFixed(2)),
      };
    });

    return totalFixed;
  }
}
