import { Module } from '@nestjs/common';
import { TransactionsService } from '../transactions/application/services/transactions.service';
import { TransactionsModule } from '../transactions/transactions.module';
import { CnabBuilderController } from './adapter/controllers/cnab-builder.controller';
import { ParseDataFactory } from './application/factories/parse-data.factory';
import { CnabBuilderService } from './application/services/cnab-builder.service';

@Module({
  imports: [TransactionsModule],
  controllers: [CnabBuilderController],
  providers: [CnabBuilderService, TransactionsService, ParseDataFactory],
  exports: [CnabBuilderService],
})
export class CnabBuilderModule {}
