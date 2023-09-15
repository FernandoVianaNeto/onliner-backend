import { Injectable } from '@nestjs/common';
import { TransactionsService } from '../../../transactions/application/services/transactions.service';
import * as _ from 'lodash';
import { ParseDataFactory } from '../factories/parse-data.factory';
import { Transaction } from '../../../transactions/domain/schema/transaction.schema';
@Injectable()
export class CnabBuilderService {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly parseDataFactory: ParseDataFactory,
  ) {}

  async uploadAndSaveFileDate(rawCnabFile: Express.Multer.File): Promise<void> {
    const treatedCnabFile = await this.treatCnabFile(rawCnabFile);

    await Promise.all(
      treatedCnabFile.map(async (data: Transaction) => {
        await this.transactionsService.create({
          type: Number(data.type),
          date: data.date,
          document: data.document,
          card: data.card,
          storeName: data.storeName,
          storeOwner: data.storeOwner,
          value: Number((Number(data.value) / 100).toFixed(2)),
        });
      }),
    );
  }

  async treatCnabFile(
    rawCnabFile: Express.Multer.File,
  ): Promise<Transaction[]> {
    const cnabToString = rawCnabFile.buffer.toString();

    const splitedStringByLines = cnabToString.split('\n');

    const cnabData = [];

    for (let rawLine of splitedStringByLines) {
      if (!_.isEqual(rawLine, '')) {
        const lineData = await this.parseDataFactory.parseData(rawLine);

        cnabData.push(lineData);
      }
    }

    return cnabData;
  }
}
