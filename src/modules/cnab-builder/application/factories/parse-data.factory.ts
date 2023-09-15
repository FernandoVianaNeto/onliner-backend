import { EPositions } from '../../domain/enums/positions.enum';
import * as _ from 'lodash';
import { IDataParser } from '../../domain/interfaces/data-parser.interface';

export class ParseDataFactory {
  async parseData(rawLine: string) {
    let data: IDataParser;

    for (
      let caracterCount = 0;
      caracterCount <= rawLine.length;
      caracterCount++
    ) {
      if (caracterCount === EPositions.type) {
        data = {
          ...data,
          type: rawLine[caracterCount],
        };
      }

      if (
        caracterCount >= EPositions.date &&
        caracterCount < EPositions.value
      ) {
        data = {
          ...data,
          date: _.isUndefined(data.date)
            ? rawLine[caracterCount]
            : data.date.concat(rawLine[caracterCount]),
        };
      }

      if (
        caracterCount >= EPositions.value &&
        caracterCount < EPositions.document
      ) {
        data = {
          ...data,
          value: _.isUndefined(data.value)
            ? rawLine[caracterCount]
            : data.value.concat(rawLine[caracterCount]),
        };
      }

      if (
        caracterCount >= EPositions.document &&
        caracterCount < EPositions.card
      ) {
        data = {
          ...data,
          document: _.isUndefined(data.document)
            ? rawLine[caracterCount]
            : data.document.concat(rawLine[caracterCount]),
        };
      }

      if (
        caracterCount >= EPositions.card &&
        caracterCount < EPositions.storeOwner
      ) {
        data = {
          ...data,
          card: _.isUndefined(data.card)
            ? rawLine[caracterCount]
            : data.card.concat(rawLine[caracterCount]),
        };
      }

      if (
        caracterCount >= EPositions.storeOwner &&
        caracterCount < EPositions.storeName
      ) {
        data = {
          ...data,
          storeOwner: _.isUndefined(data.storeOwner)
            ? rawLine[caracterCount]
            : data.storeOwner.concat(rawLine[caracterCount]),
        };
      }

      if (
        caracterCount >= EPositions.storeName &&
        caracterCount < rawLine.length
      ) {
        data = {
          ...data,
          storeName: _.isUndefined(data.storeName)
            ? rawLine[caracterCount]
            : data.storeName.concat(rawLine[caracterCount]),
        };
      }
    }

    return data;
  }
}
