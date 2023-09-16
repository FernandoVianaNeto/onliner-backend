import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IAuthorized } from '../domain/interfaces/auth.interface';

@Injectable()
export class AuthService {
  constructor(private jwtTokenService: JwtService) {}

  validateApp(client: string, secret: string): IAuthorized | null {
    if (
      client === process.env.CLIENT_APP &&
      secret === process.env.SECRET_APP
    ) {
      return { client: process.env.CLIENT_APP, id: process.env.ID_APP };
    }

    return null;
  }

  async loginApp(req: any): Promise<{ access_token: string }> {
    const { client, id } = req.user;

    const payload = {
      client: client,
      id: id,
    };

    const accessToken = {
      access_token: this.jwtTokenService.sign(payload),
    };

    return accessToken;
  }
}
