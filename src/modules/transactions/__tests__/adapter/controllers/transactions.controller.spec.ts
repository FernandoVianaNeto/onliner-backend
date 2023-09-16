import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsController } from '../../../../transactions/adapter/controllers/transactions.controller';
import { TransactionsService } from '../../../../transactions/application/services/transactions.service';
import { transactionSuccessfullyStub } from '../../../../transactions/__mocks__/stub/transaction.stub';
import { transactionsWithSumStub } from '../../../../transactions/__mocks__/stub/transactions-with-sum.stub';

describe('TransactionsController', () => {
  let sut: TransactionsController;
  let service: TransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsController],
      providers: [
        TransactionsService,
        {
          provide: TransactionsService,
          useFactory: () => ({
            findUnsuccessfullyTransactions: jest.fn(),
            findAndSumTotalByStoreName: jest.fn(),
          }),
        },
      ],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
    sut = module.get<TransactionsController>(TransactionsController);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(sut).toBeDefined();
  });

  describe('findAndSumTotalByStoreName', () => {
    it('should return user info', async () => {
      jest
        .spyOn(service, 'findAndSumTotalByStoreName')
        .mockResolvedValueOnce(transactionsWithSumStub());

      const response = await sut.findAndSumTotalByStoreName({});
      expect(response).toEqual(transactionsWithSumStub());
    });

    it('should call method with correct params', async () => {
      const spyOn = jest.spyOn(service, 'findAndSumTotalByStoreName');

      await sut.findAndSumTotalByStoreName({});
      expect(spyOn).toBeCalledWith({});
    });
  });

  describe('findUnsuccessfullyTransactions', () => {
    it('should return user info', async () => {
      jest
        .spyOn(service, 'findUnsuccessfullyTransactions')
        .mockResolvedValueOnce([transactionSuccessfullyStub()]);

      const response = await sut.findUnsuccessfullyTransactions({});
      expect(response).toEqual([transactionSuccessfullyStub()]);
    });

    it('should call method with correct params', async () => {
      const spyOn = jest.spyOn(sut, 'findUnsuccessfullyTransactions');

      await sut.findUnsuccessfullyTransactions({});
      expect(spyOn).toBeCalledWith({});
    });
  });
});
