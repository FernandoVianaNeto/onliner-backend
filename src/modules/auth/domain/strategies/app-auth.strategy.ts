import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthService } from '../../application/auth.service';
import * as _ from 'lodash';

@Injectable()
export class AppAuthStrategy extends PassportStrategy(
  Strategy,
  'app-validation-strategy',
) {
  constructor(public authService: AuthService) {
    super({
      usernameField: 'client',
      passwordField: 'secret',
    });
  }

  async validate(client: string, secret: string): Promise<any> {
    const app = this.authService.validateApp(client, secret);

    if (_.isNull(app)) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    return app;
  }
}
