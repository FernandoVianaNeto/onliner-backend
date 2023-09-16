import { Test, TestingModule } from '@nestjs/testing';
import { CnabBuilderController } from '../../../../cnab-builder/adapter/controllers/cnab-builder.controller';
import { CnabBuilderService } from '../../../../cnab-builder/application/services/cnab-builder.service';
import { cnabFileStub } from '../../../../cnab-builder/__mocks__/stub/cnab-builder.stub';
import { uploadAndSaveDataStub } from '../../../../cnab-builder/__mocks__/stub/upload-and-save-data-result.stub';

describe('CnabBuilderController', () => {
  let sut: CnabBuilderController;
  let service: CnabBuilderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CnabBuilderController],
      providers: [
        CnabBuilderService,
        {
          provide: CnabBuilderService,
          useFactory: () => ({
            uploadAndSaveFileDate: jest.fn(),
          }),
        },
      ],
    }).compile();

    service = module.get<CnabBuilderService>(CnabBuilderService);
    sut = module.get<CnabBuilderController>(CnabBuilderController);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(sut).toBeDefined();
  });

  describe('uploadFile', () => {
    it('should return user info', async () => {
      jest
        .spyOn(service, 'uploadAndSaveFileDate')
        .mockResolvedValueOnce(uploadAndSaveDataStub());

      const response = await sut.uploadFile(
        cnabFileStub() as Express.Multer.File,
      );
      expect(response).toEqual(uploadAndSaveDataStub());
    });

    it('should call method with correct params', async () => {
      const spyOn = jest.spyOn(service, 'uploadAndSaveFileDate');

      await sut.uploadFile(cnabFileStub() as Express.Multer.File);

      expect(spyOn).toBeCalledWith(cnabFileStub() as Express.Multer.File);
    });
  });
});
