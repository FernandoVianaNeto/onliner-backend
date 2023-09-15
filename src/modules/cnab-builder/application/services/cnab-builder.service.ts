import { Injectable } from '@nestjs/common';
import { TransactionsService } from '../../../transactions/application/services/transaction.service';
import * as _ from 'lodash';
import { ParseDataFactory } from '../factories/parse-data.factory';
@Injectable()
export class CnabBuilderService {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly parseDataFactory: ParseDataFactory,
  ) {}

  async uploadAndSaveFileDate(rawCnabFile: any) {
    const treatedCnabFile = await this.treatCnabFile(rawCnabFile);

    console.log(treatedCnabFile, 'É ESSE LOG AQUI');
  }

  async treatCnabFile(rawCnabFile: any) {
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
