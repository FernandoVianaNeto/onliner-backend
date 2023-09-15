import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtFromRequest } from '../interfaces/auth.interface';

@Injectable()
export class AppTokenStrategy extends PassportStrategy(
  Strategy,
  'app-token-strategy',
) {
  constructor(private jwtService: JwtService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_KEY,
    });
  }

  async validate(jwtFromRequest: IJwtFromRequest) {
    if (jwtFromRequest.client !== process.env.CLIENT_APP) {
      throw new UnauthorizedException();
    }

    return jwtFromRequest;
  }
}
