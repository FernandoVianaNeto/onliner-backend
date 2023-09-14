import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    TransactionsModule,
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
