import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { transactionUnsuccessfullyStub } from '../../../../transactions/__mocks__/stub/transaction.stub';
import { TransactionRepositoryAdapter } from '../../../../transactions/adapter/repository-adapter/transaction.repository.adapter';
import {
  Transaction,
  TransactionDocument,
} from '../../../../transactions/domain/schema/transaction.schema';

describe('TransactionRepositoryAdapter', () => {
  let sut: TransactionRepositoryAdapter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionRepositoryAdapter,
        {
          provide: getModelToken(Transaction.name),
          useValue: {},
        },
      ],
    }).compile();

    sut = module.get<TransactionRepositoryAdapter>(
      TransactionRepositoryAdapter,
    );

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  describe('findUnsuccessfullyTransactions', () => {
    it('should return the correct data', async () => {
      jest.spyOn(sut, 'find').mockImplementationOnce(() => {
        return new Promise((resolve) =>
          resolve([transactionUnsuccessfullyStub()] as TransactionDocument[]),
        );
      });

      const response = await sut.findUnsuccessfullyTransactions({});

      expect(response).toEqual([transactionUnsuccessfullyStub()]);
    });

    it('call method with correct params', async () => {
      const spyOn = jest.spyOn(sut, 'find').mockImplementationOnce(() => {
        return new Promise((resolve) =>
          resolve([transactionUnsuccessfullyStub()] as TransactionDocument[]),
        );
      });

      await sut.findUnsuccessfullyTransactions({});

      expect(spyOn).toHaveBeenCalledWith({ success: false });
    });
  });
});
