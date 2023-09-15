import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpExceptionFilter } from '../infrastructure/filters/http-exception.filter';
import { AuthModule } from './auth/auth.module';
import { CnabBuilderModule } from './cnab-builder/cnab-builder.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    TransactionsModule,
    CnabBuilderModule,
    AuthModule,
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.DATABASE_URI,
      }),
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
