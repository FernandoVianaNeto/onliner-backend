import { Test, TestingModule } from '@nestjs/testing';
import { ParseDataFactory } from '../../../../cnab-builder/application/factories/parse-data.factory';

describe('ParseDataFactory', () => {
  let sut: ParseDataFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [ParseDataFactory],
    }).compile();

    sut = module.get<ParseDataFactory>(ParseDataFactory);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  describe('parseData', () => {
    it('should return with correct data', async () => {
      const response = await sut.parseData(
        '2202301020000002600081521415422677****8778CARLOS HENRIQUPADARIA 3 CORAÇÕES',
      );
      expect(response).toEqual({
        type: '2',
        date: '20230102',
        value: '0000002600',
        document: '08152141542',
        card: '2677****8778',
        storeOwner: 'CARLOS HENRIQU',
        storeName: 'PADARIA 3 CORAÇÕES',
      });
    });
  });
});
