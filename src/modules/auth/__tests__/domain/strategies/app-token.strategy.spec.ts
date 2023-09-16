import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { accessTokenStub } from '../../../__mocks__/stubs/auth.stub';
import { AppTokenStrategy } from '../../../domain/strategies/app-token.strategy';

describe('App Token', () => {
  let appTokenStrategy: AppTokenStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppTokenStrategy,
        {
          provide: JwtService,
          useValue: {
            verifyAsync: jest.fn(),
            sign: jest.fn().mockReturnValueOnce(accessTokenStub().access_token),
          },
        },
      ],
    }).compile();

    appTokenStrategy = module.get<AppTokenStrategy>(AppTokenStrategy);

    jest.clearAllMocks();
  });

  describe('.validate', () => {
    process.env.JWT_KEY = '123456';
    process.env.CLIENT_APP = 'client_app';
    process.env.SECRET_APP = '123456';
    process.env.ID_APP = '231321';

    it('should return a valid client and secret', async () => {
      const result = await appTokenStrategy.validate({
        client: 'client_app',
        iat: 123456,
        exp: 123,
      });

      expect(result.client).toEqual(process.env.CLIENT_APP);
    });
  });
});
