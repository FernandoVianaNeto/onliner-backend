import { Test, TestingModule } from '@nestjs/testing';
import { request } from 'express';
import { AuthController } from '../../adapter/controllers/auth.controller';
import { AuthService } from '../../application/auth.service';
import { AccessTokenStub } from '../../__mocks__/stubs/auth.stub';

jest.mock('../auth.service');

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(controller).toBeDefined();
  });

  describe('when loginApp is called', () => {
    it('should return the access token to the app', async () => {
      const response = await controller.loginApp(request);

      expect(response).toEqual(AccessTokenStub());
    });
  });
});
