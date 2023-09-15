import { Controller, Get, Query } from '@nestjs/common';
import { TransactionsService } from '../../application/services/transactions.service';
import { FindTransactionDto } from '../../domain/dto/find-transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get('/find')
  async find(@Query() findTransactionDto: FindTransactionDto) {
    return this.transactionsService.find(findTransactionDto);
  }
}
