import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './application/auth.service';
import { AuthController } from './adapter/controllers/auth.controller';
import { AppAuthStrategy } from './domain/strategies/app-auth.strategy';
import { AppTokenStrategy } from './domain/strategies/app-token.strategy';
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_KEY,
      signOptions: { expiresIn: '86400s' },
    }),
  ],
  exports: [AuthService],
  controllers: [AuthController],
  providers: [AuthService, AppAuthStrategy, AppTokenStrategy],
})
export class AuthModule {}
