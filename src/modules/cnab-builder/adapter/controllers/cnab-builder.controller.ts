import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppTokenGuard } from '../../../auth/domain/guards/app-token.guard';
import { CnabBuilderService } from '../../application/services/cnab-builder.service';
import { IUploadAndSaveDataResult } from '../../domain/interfaces/upload-and-save-data-return.interface';

@ApiTags('Cnab-Builder')
@ApiBearerAuth('app')
@Controller('cnab-builder')
@UseGuards(AppTokenGuard)
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
          type: 'Express.Multer.File',
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
