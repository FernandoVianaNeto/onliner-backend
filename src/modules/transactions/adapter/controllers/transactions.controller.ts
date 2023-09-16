import { Controller, Get, Query } from '@nestjs/common';
import { TransactionsService } from '../../application/services/transactions.service';
import { FindTransactionDto } from '../../domain/dto/find-transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get('/find')
  async findAndSumTotalByStoreName(
    @Query() findTransactionDto: FindTransactionDto,
  ) {
    return this.transactionsService.findAndSumTotalByStoreName(
      findTransactionDto,
    );
  }

  @Get('/find-unsuccessfully')
  async findUnsuccessfullyTransactions(
    @Query() findTransactionDto: FindTransactionDto,
  ) {
    return this.transactionsService.findUnsuccessfullyTransactions(
      findTransactionDto,
    );
  }
}
