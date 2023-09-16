import { Test, TestingModule } from '@nestjs/testing';
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
            find: jest.fn(),
            create: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByEmail: jest.fn(),
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

  describe('list', () => {
    it('should return correct data', async () => {
      jest
        .spyOn(repositoryAdapter, 'find')
        .mockResolvedValueOnce([responsibleStub()] as ResponsibleDocument[]);

      const response = await sut.list();

      expect(response).toEqual([responsibleStub()]);
    });

    it('should call method with correct params', async () => {
      const spyOn = jest.spyOn(repositoryAdapter, 'find');

      await sut.list();

      expect(spyOn).toBeCalledWith({});
    });
  });

  describe('create', () => {
    it('should return correct data', async () => {
      jest
        .spyOn(repositoryAdapter, 'create')
        .mockResolvedValueOnce(responsibleStub() as ResponsibleDocument);

      const response = await sut.create({
        name: 'test',
        email: 'test@gmail.com',
        phone: 'test',
      });

      expect(response).toEqual(responsibleStub());
    });

    it('should call method with correct params', async () => {
      const spyOn = jest.spyOn(repositoryAdapter, 'create');

      await sut.create({
        name: 'test',
        email: 'test@gmail.com',
        phone: 'test',
      });

      expect(spyOn).toBeCalledWith({
        name: 'test',
        email: 'test@gmail.com',
        phone: 'test',
      });
    });
  });

  describe('update', () => {
    it('should return correct data', async () => {
      jest
        .spyOn(repositoryAdapter, 'findByIdAndUpdate')
        .mockResolvedValueOnce(responsibleStub() as any);

      const response = await sut.update({
        name: 'test',
        email: 'test@gmail.com',
        phone: 'test',
        id: '64ba665bf4333f7b0d86e9ad',
      });

      expect(response).toEqual(responsibleStub());
    });
  });

  describe('findByEmail', () => {
    it('should return correct data', async () => {
      jest
        .spyOn(repositoryAdapter, 'findByEmail')
        .mockResolvedValueOnce(responsibleStub() as any);

      const response = await sut.findByEmail('test@gmail.com');

      expect(response).toEqual(responsibleStub());
    });

    it('should call method with correct params', async () => {
      const spyOn = jest.spyOn(repositoryAdapter, 'findByEmail');

      await sut.findByEmail('test@gmail.com');

      expect(spyOn).toBeCalledWith('test@gmail.com');
    });
  });
});
