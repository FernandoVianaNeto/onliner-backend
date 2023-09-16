import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import {
  createTransactionDtoStub,
  createUnsuccessfullyTransactionDtoStub,
} from '../../../../transactions/__mocks__/stub/create-transaction-dto.stub';
import {
  transactionSuccessfullyStub,
  transactionUnsuccessfullyStub,
} from '../../../../transactions/__mocks__/stub/transaction.stub';
import { TransactionRepository } from '../../../../transactions/application/repositories/transaction.repository';
import { TransactionsService } from '../../../../transactions/application/services/transactions.service';
import {
  Transaction,
  TransactionDocument,
} from '../../../../transactions/domain/schema/transaction.schema';
import { transactionsWithSumStub } from '../../../../transactions/__mocks__/stub/transactions-with-sum.stub';

describe('TransactionsService', () => {
  let sut: TransactionsService;
  let repository: TransactionRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        TransactionsService,
        TransactionRepository,
        {
          provide: getModelToken(Transaction.name),
          useValue: {},
        },
        {
          provide: TransactionRepository,
          useFactory: () => ({
            create: jest.fn(),
            findAndSumTotalByStoreName: jest.fn(),
            findUnsuccessfullyTransactions: jest.fn(),
          }),
        },
      ],
    }).compile();

    sut = module.get<TransactionsService>(TransactionsService);
    repository = module.get<TransactionRepository>(TransactionRepository);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should return with correct data', async () => {
      jest
        .spyOn(repository, 'create')
        .mockResolvedValueOnce(
          transactionSuccessfullyStub() as TransactionDocument,
        );

      const response = await sut.create(createTransactionDtoStub());
      expect(response).toEqual(transactionSuccessfullyStub());
    });

    it('should call method with correct params', async () => {
      const spyOn = jest.spyOn(repository, 'create');

      await sut.create(createTransactionDtoStub());

      expect(spyOn).toBeCalledWith(createTransactionDtoStub());
    });

    it('should create a unsuccessfully transaction if document is not a valid cpf', async () => {
      const spyOn = jest.spyOn(repository, 'create');

      await sut.create(createUnsuccessfullyTransactionDtoStub());

      expect(spyOn).toBeCalledWith(createUnsuccessfullyTransactionDtoStub());
    });
  });

  describe('create', () => {
    it('should return with correct data', async () => {
      jest
        .spyOn(repository, 'create')
        .mockResolvedValueOnce(
          transactionSuccessfullyStub() as TransactionDocument,
        );

      const response = await sut.create(createTransactionDtoStub());
      expect(response).toEqual(transactionSuccessfullyStub());
    });

    it('should call method with correct params', async () => {
      const spyOn = jest.spyOn(repository, 'create');

      await sut.create(createTransactionDtoStub());

      expect(spyOn).toBeCalledWith(createTransactionDtoStub());
    });

    it('should create a unsuccessfully transaction if document is not a valid cpf', async () => {
      const spyOn = jest.spyOn(repository, 'create');

      await sut.create(createUnsuccessfullyTransactionDtoStub());

      expect(spyOn).toBeCalledWith(createUnsuccessfullyTransactionDtoStub());
    });
  });

  describe('findAndSumTotalByStoreName', () => {
    it('should return with correct data', async () => {
      jest
        .spyOn(repository, 'findAndSumTotalByStoreName')
        .mockResolvedValueOnce(transactionsWithSumStub());

      const response = await sut.findAndSumTotalByStoreName({});
      expect(response).toEqual(transactionsWithSumStub());
    });

    it('should call method with correct params', async () => {
      const spyOn = jest.spyOn(repository, 'findAndSumTotalByStoreName');

      await sut.findAndSumTotalByStoreName({});

      expect(spyOn).toBeCalledWith({});
    });
  });

  describe('findUnsuccessfullyTransactions', () => {
    it('should return with correct data', async () => {
      jest
        .spyOn(repository, 'findUnsuccessfullyTransactions')
        .mockResolvedValueOnce([transactionUnsuccessfullyStub()]);

      const response = await sut.findUnsuccessfullyTransactions({});
      expect(response).toEqual([transactionUnsuccessfullyStub()]);
    });

    it('should call method with correct params', async () => {
      const spyOn = jest.spyOn(repository, 'findUnsuccessfullyTransactions');

      await sut.findUnsuccessfullyTransactions({});

      expect(spyOn).toBeCalledWith({});
    });
  });
});
