import { Module } from '@nestjs/common';
import { CnabBuilderController } from './adapter/controllers/cnab-builder.controller';
import { CnabBuilderService } from './application/services/cnab-builder.service';

@Module({
  imports: [],
  controllers: [CnabBuilderController],
  providers: [CnabBuilderService],
  exports: [CnabBuilderService],
})
export class CnabBuilderModule {}
