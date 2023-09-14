import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CnabBuilderModule } from './cnab-builder/cnab-builder.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    TransactionsModule,
    CnabBuilderModule,
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.DATABASE_URI,
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
