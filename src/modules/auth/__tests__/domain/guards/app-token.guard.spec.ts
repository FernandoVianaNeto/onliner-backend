import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { AppTokenGuard } from '../../../../auth/domain/guards/app-token.guard';

describe('AppTokenGuard', () => {
  let sut: AppTokenGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppTokenGuard],
    }).compile();

    sut = module.get<AppTokenGuard>(AppTokenGuard);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  describe('handleRequest', () => {
    it('should throw error if error parameter is provided', async () => {
      try {
        await sut.handleRequest(new Error('dummy_error'), {});
      } catch (error) {
        expect(error).toEqual(new Error('dummy_error'));
      }
    });

    it('should throw unauthorized if error parameter is provided', () => {
      try {
        sut.handleRequest(undefined, false);
      } catch (error) {
        expect(error).toEqual(
          new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED),
        );
      }
    });

    it('should return user if user is provided', async () => {
      const result = await sut.handleRequest(undefined, { name: 'dummy_name' });
      expect(result).toEqual({
        name: 'dummy_name',
      });
    });
  });
});
