import { ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export class AppTokenGuard extends AuthGuard('app-token-strategy') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw err || new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
