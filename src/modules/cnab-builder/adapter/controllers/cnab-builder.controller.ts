import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CnabBuilderService } from '../../application/services/cnab-builder.service';

@Controller('cnab-builder')
export class CnabBuilderController {
  constructor(private readonly cnabBuilderService: CnabBuilderService) {}

  @Post('upload-file')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: any) {
    return this.cnabBuilderService.uploadAndSaveFileDate(file);
  }
}
