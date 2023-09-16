import { Test, TestingModule } from '@nestjs/testing';
import { request } from 'express';
import { AuthController } from '../../adapter/controllers/auth.controller';
import { AuthService } from '../../application/auth.service';
import { accessTokenStub } from '../../__mocks__/stubs/auth.stub';
import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
  let sut: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        JwtService,
        {
          provide: AuthService,
          useFactory: () => ({
            loginApp: jest.fn(),
          }),
        },
      ],
    }).compile();

    sut = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(sut).toBeDefined();
  });

  describe('loginApp', () => {
    it('should return correct data', async () => {
      jest.spyOn(service, 'loginApp').mockResolvedValue(accessTokenStub());

      const response = await sut.loginApp(request);

      expect(response).toEqual(accessTokenStub());
    });
  });
});
