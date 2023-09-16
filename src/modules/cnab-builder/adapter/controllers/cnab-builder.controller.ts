import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CnabBuilderService } from '../../application/services/cnab-builder.service';
import { IUploadAndSaveDataResult } from '../../domain/interfaces/upload-and-save-data-return.interface';

@Controller('cnab-builder')
export class CnabBuilderController {
  constructor(private readonly cnabBuilderService: CnabBuilderService) {}

  @Post('upload-file')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<IUploadAndSaveDataResult> {
    return this.cnabBuilderService.uploadAndSaveFileDate(file);
  }
}
