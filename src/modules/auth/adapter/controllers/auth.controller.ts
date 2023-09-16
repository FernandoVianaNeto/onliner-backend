import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../../application/auth.service';
import { ClientSecretAppDto } from '../../domain/dto/client-secret-app.dto';
import { AppAuthGuard } from '../../domain/guards/app-auth.guard';

@Controller()
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AppAuthGuard)
  @ApiBody({ type: ClientSecretAppDto })
  @ApiOperation({
    summary: 'return the access token',
  })
  @Post('/auth/app')
  loginApp(@Request() req: any) {
    return this.authService.loginApp(req);
  }
}
