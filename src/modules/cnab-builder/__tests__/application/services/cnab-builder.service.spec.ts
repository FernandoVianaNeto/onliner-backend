import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { transactionSuccessfullyStub } from '../../../../transactions/__mocks__/stub/transaction.stub';
import { Transaction } from '../../../../transactions/domain/schema/transaction.schema';
import { ParseDataFactory } from '../../../../cnab-builder/application/factories/parse-data.factory';
import { CnabBuilderService } from '../../../../cnab-builder/application/services/cnab-builder.service';
import { TransactionsService } from '../../../../transactions/application/services/transactions.service';
import { cnabFileStub } from '../../../../cnab-builder/__mocks__/stub/cnab-builder.stub';

describe('CnabBuilderService', () => {
  let sut: CnabBuilderService;
  let transactionsService: TransactionsService;
  let parseDataFactory: ParseDataFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CnabBuilderService,
        TransactionsService,
        {
          provide: getModelToken(Transaction.name),
          useValue: {},
        },
        {
          provide: TransactionsService,
          useFactory: () => ({
            create: jest.fn(),
          }),
        },
        {
          provide: ParseDataFactory,
          useFactory: () => ({
            parseData: jest.fn(),
          }),
        },
      ],
    }).compile();

    sut = module.get<CnabBuilderService>(CnabBuilderService);
    transactionsService = module.get<TransactionsService>(TransactionsService);
    parseDataFactory = module.get<ParseDataFactory>(ParseDataFactory);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(transactionsService).toBeDefined();
    expect(parseDataFactory).toBeDefined();
  });

  describe('uploadAndSaveFileDate', () => {
    it('should return with correct data', async () => {
      jest.spyOn(sut, 'treatCnabFile').mockResolvedValueOnce([
        {
          ...transactionSuccessfullyStub(),
          value: String(transactionSuccessfullyStub().value),
          type: String(transactionSuccessfullyStub().type),
        },
      ]);

      jest
        .spyOn(transactionsService, 'create')
        .mockResolvedValueOnce(transactionSuccessfullyStub());

      const response = await sut.uploadAndSaveFileDate(
        cnabFileStub() as Express.Multer.File,
      );
      expect(response).toEqual({
        successfully: [transactionSuccessfullyStub()],
        unsuccessfully: [],
      });
    });

    it('should call method with correct params', async () => {
      const spyOn = jest.spyOn(sut, 'treatCnabFile').mockResolvedValueOnce([
        {
          ...transactionSuccessfullyStub(),
          value: String(transactionSuccessfullyStub().value),
          type: String(transactionSuccessfullyStub().type),
        },
      ]);

      jest
        .spyOn(transactionsService, 'create')
        .mockResolvedValueOnce(transactionSuccessfullyStub());

      await sut.uploadAndSaveFileDate(cnabFileStub() as Express.Multer.File);

      expect(spyOn).toBeCalledWith(cnabFileStub());
    });

    it('should call method with correct params', async () => {
      jest.spyOn(sut, 'treatCnabFile').mockResolvedValueOnce([
        {
          ...transactionSuccessfullyStub(),
          value: String(transactionSuccessfullyStub().value),
          type: String(transactionSuccessfullyStub().type),
        },
      ]);

      const spyOn = jest
        .spyOn(transactionsService, 'create')
        .mockResolvedValueOnce(transactionSuccessfullyStub());

      await sut.uploadAndSaveFileDate(cnabFileStub() as Express.Multer.File);

      expect(spyOn).toBeCalledWith({
        card: '1753****3153',
        date: '20230102',
        document: '19551496078',
        storeName: 'ADEGA PEREIRA',
        storeOwner: 'AFONSO PEREIRA',
        type: 3,
        value: 1.51,
      });
    });
  });

  describe('treatCnabFile', () => {
    it('should return with correct data', async () => {
      jest.spyOn(parseDataFactory, 'parseData').mockResolvedValueOnce({
        ...transactionSuccessfullyStub(),
        value: String(transactionSuccessfullyStub().value),
        type: String(transactionSuccessfullyStub().type),
      });

      const response = await sut.treatCnabFile(
        cnabFileStub() as Express.Multer.File,
      );
      expect(response).toEqual([
        {
          ...transactionSuccessfullyStub(),
          value: String(transactionSuccessfullyStub().value),
          type: String(transactionSuccessfullyStub().type),
        },
      ]);
    });

    it('should call the method with correct params', async () => {
      const spyOn = jest.spyOn(parseDataFactory, 'parseData');

      await sut.treatCnabFile(cnabFileStub() as Express.Multer.File);

      expect(spyOn).toBeCalledWith('test');
    });
  });
});
