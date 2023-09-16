import { ApiProperty } from '@nestjs/swagger';

export class AuthorizeReturnDto {
  @ApiProperty({
    type: String,
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnQiOiJ0ZXN0ZSIsImlkIjoiMTIzIiwiaWF0IjoxNjk0ODc3OTA2LCJleHAiOjE2OTQ5NjQzMDZ9.FvTCnKHdBKNT8vgN7ogMUpAk2MMyhBlBd49Yro-0aXI',
  })
  access_token: string;
}
