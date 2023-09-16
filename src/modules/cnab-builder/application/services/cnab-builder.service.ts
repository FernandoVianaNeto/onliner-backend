import { Injectable } from '@nestjs/common';
import { TransactionsService } from '../../../transactions/application/services/transactions.service';
import * as _ from 'lodash';
import { ParseDataFactory } from '../factories/parse-data.factory';
import { IUploadAndSaveDataResult } from '../../domain/interfaces/upload-and-save-data-return.interface';
import { IDataParser } from '../../domain/interfaces/data-parser.interface';
@Injectable()
export class CnabBuilderService {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly parseDataFactory: ParseDataFactory,
  ) {}

  async uploadAndSaveFileDate(
    rawCnabFile: Express.Multer.File,
  ): Promise<IUploadAndSaveDataResult> {
    const treatedCnabFile = await this.treatCnabFile(rawCnabFile);

    const successfullyTransactions = [];
    const unsuccessfullyTransactions = [];

    for (let data of treatedCnabFile) {
      const transactionResult = await this.transactionsService.create({
        type: Number(data.type),
        date: data.date,
        document: data.document,
        card: data.card,
        storeName: data.storeName,
        storeOwner: data.storeOwner,
        value: Number((Number(data.value) / 100).toFixed(2)),
      });

      if (_.isEqual(transactionResult.success, true)) {
        successfullyTransactions.push(transactionResult);
      } else {
        unsuccessfullyTransactions.push(transactionResult);
      }
    }

    return {
      successfully: successfullyTransactions,
      unsuccessfully: unsuccessfullyTransactions,
    };
  }

  async treatCnabFile(
    rawCnabFile: Express.Multer.File,
  ): Promise<IDataParser[]> {
    const cnabToString = rawCnabFile.buffer.toString();

    const splitedStringByLines = cnabToString.split('\n');

    const cnabData: IDataParser[] = [];

    for (let rawLine of splitedStringByLines) {
      if (!_.isEqual(rawLine, '')) {
        const lineData = await this.parseDataFactory.parseData(rawLine);

        cnabData.push(lineData);
      }
    }

    return cnabData;
  }
}
