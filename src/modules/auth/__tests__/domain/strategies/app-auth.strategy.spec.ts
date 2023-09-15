import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../../application/auth.service';
import { AppAuthStrategy } from '../../../domain/strategies/app-auth.strategy';

describe('App Auth', () => {
  let appAuthStrategy: AppAuthStrategy;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppAuthStrategy,
        {
          provide: AuthService,
          useFactory: () => ({
            validateApp: jest.fn(),
          }),
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    appAuthStrategy = module.get<AppAuthStrategy>(AppAuthStrategy);

    jest.clearAllMocks();
  });

  describe('validate', () => {
    process.env.CLIENT_APP = 'client_app';
    process.env.SECRET_APP = '123456';
    process.env.ID_APP = '231321';

    it('should return a valid client and secret', async () => {
      jest.spyOn(authService, 'validateApp').mockReturnValueOnce({
        client: process.env.CLIENT_APP,
        secret: process.env.SECRET_APP,
      });

      const result = await appAuthStrategy.validate(
        process.env.CLIENT_APP,
        process.env.SECRET_APP,
      );

      expect(result).toEqual({
        client: process.env.CLIENT_APP,
        secret: process.env.SECRET_APP,
      });
    });
  });
});
