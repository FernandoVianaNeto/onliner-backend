import { Test, TestingModule } from '@nestjs/testing';
import { TransactionDocument } from '../../../../transactions/domain/schema/transaction.schema';
import { createTransactionDtoStub } from '../../../../transactions/__mocks__/stub/create-transaction-dto.stub';
import { transactionSuccessfullyStub } from '../../../../transactions/__mocks__/stub/transaction.stub';
import { transactionsWithSumStub } from '../../../../transactions/__mocks__/stub/transactions-with-sum.stub';
import { TransactionRepositoryAdapter } from '../../../../transactions/adapter/repository-adapter/transaction.repository.adapter';
import { TransactionRepository } from '../../../../transactions/application/repositories/transaction.repository';

describe('TransactionRepository', () => {
  let sut: TransactionRepository;
  let repositoryAdapter: TransactionRepositoryAdapter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionRepository,
        TransactionRepositoryAdapter,
        {
          provide: TransactionRepositoryAdapter,
          useFactory: () => ({
            findUnsuccessfullyTransactions: jest.fn(),
            findAndSumTotalByStoreName: jest.fn(),
            create: jest.fn(),
          }),
        },
      ],
    }).compile();

    repositoryAdapter = module.get<TransactionRepositoryAdapter>(
      TransactionRepositoryAdapter,
    );
    sut = module.get<TransactionRepository>(TransactionRepository);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(repositoryAdapter).toBeDefined();
    expect(sut).toBeDefined();
  });

  describe('create', () => {
    it('should return correct data', async () => {
      jest
        .spyOn(repositoryAdapter, 'create')
        .mockResolvedValueOnce(
          transactionSuccessfullyStub() as TransactionDocument,
        );
      const response = await sut.create(createTransactionDtoStub());

      expect(response).toEqual(transactionSuccessfullyStub());
    });

    it('should call method with correct params', async () => {
      const spyOn = jest.spyOn(repositoryAdapter, 'create');

      await sut.create(createTransactionDtoStub());

      expect(spyOn).toBeCalledWith(createTransactionDtoStub());
    });
  });

  describe('findAndSumTotalByStoreName', () => {
    it('should return correct data', async () => {
      jest
        .spyOn(repositoryAdapter, 'findAndSumTotalByStoreName')
        .mockResolvedValueOnce(transactionsWithSumStub());

      const response = await sut.findAndSumTotalByStoreName({});

      expect(response).toEqual(transactionsWithSumStub());
    });

    it('should call method with correct params', async () => {
      const spyOn = jest.spyOn(repositoryAdapter, 'findAndSumTotalByStoreName');

      await sut.findAndSumTotalByStoreName({});

      expect(spyOn).toBeCalledWith({});
    });
  });

  describe('findUnsuccessfullyTransactions', () => {
    it('should return correct data', async () => {
      jest
        .spyOn(repositoryAdapter, 'findUnsuccessfullyTransactions')
        .mockResolvedValueOnce([transactionSuccessfullyStub()]);

      const response = await sut.findUnsuccessfullyTransactions({});

      expect(response).toEqual([transactionSuccessfullyStub()]);
    });

    it('should call method with correct params', async () => {
      const spyOn = jest.spyOn(
        repositoryAdapter,
        'findUnsuccessfullyTransactions',
      );

      await sut.findUnsuccessfullyTransactions({});

      expect(spyOn).toBeCalledWith({});
    });
  });
});
