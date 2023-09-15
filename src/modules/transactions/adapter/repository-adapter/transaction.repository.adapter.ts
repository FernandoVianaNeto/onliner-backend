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
import { ITransactionSum } from '../../domain/interfaces/transactions-sum';

@Injectable()
export class TransactionRepositoryAdapter extends EntityRepository<TransactionDocument> {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
  ) {
    super(transactionModel);
  }

  async findAndSumTotalByStoreName(
    findTransactionDto: FindTransactionDto,
  ): Promise<ITransactionSum> {
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

    const totalFixed = aggregateByStoreName.map((item: ITransactionSum) => {
      return {
        name: item._id,
        total: Number(item.total.toFixed(2)),
        transactions: item.transactions,
      };
    });

    return totalFixed;
  }
}
