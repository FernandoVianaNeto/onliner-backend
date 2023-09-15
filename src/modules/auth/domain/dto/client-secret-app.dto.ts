import { ApiProperty } from '@nestjs/swagger';

export class ClientSecretAppDto {
  @ApiProperty({
    name: 'client',
    type: String,
    description: 'client to access api routes',
    default: 'client_teste',
    example: 'client_teste',
  })
  client: string;

  @ApiProperty({
    name: 'secret',
    type: String,
    description: 'secret to access api routes',
    default: '698dc19d489c4e4db73e28a713eab07b',
    example: '698dc19d489c4e4db73e28a713eab07b',
  })
  secret: string;
}
