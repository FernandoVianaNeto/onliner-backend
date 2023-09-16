import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CnabBuilderService } from '../../application/services/cnab-builder.service';
import { IUploadAndSaveDataResult } from '../../domain/interfaces/upload-and-save-data-return.interface';

@ApiTags('Cnab-Builder')
@Controller('cnab-builder')
export class CnabBuilderController {
  constructor(private readonly cnabBuilderService: CnabBuilderService) {}

  @Post('upload-file')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({
    summary:
      'upload a cnab file, treat data, and save the transactions in database',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<IUploadAndSaveDataResult> {
    return this.cnabBuilderService.uploadAndSaveFileDate(file);
  }
}
