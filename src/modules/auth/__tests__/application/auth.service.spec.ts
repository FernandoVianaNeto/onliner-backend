import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../../application/auth.service';
import { accessTokenStub } from '../../__mocks__/stubs/auth.stub';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useFactory: () => ({
            sign: jest.fn().mockReturnValueOnce(accessTokenStub().access_token),
          }),
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('validate app', () => {
    process.env.CLIENT_APP = 'client_app';
    process.env.SECRET_APP = '123456';
    process.env.ID_APP = '231321';

    it('should return null if invalid client or secret app are provided', async () => {
      const res = authService.validateApp(process.env.CLIENT_APP, '321321321');

      expect(res).toEqual(null);
    });

    it('should return the app client and id', async () => {
      const res = authService.validateApp(
        process.env.CLIENT_APP,
        process.env.SECRET_APP,
      );

      expect(res).toEqual({
        client: process.env.CLIENT_APP,
        id: process.env.ID_APP,
      });
    });
  });

  describe('login app', () => {
    it('should return app access token', async () => {
      const request = {
        user: {
          client: '123456',
          id: '123456',
        },
      };

      const res = await authService.loginApp(request);

      expect(res).toEqual(accessTokenStub());
    });
  });
});
