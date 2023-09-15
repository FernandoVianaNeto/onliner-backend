import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TransactionsService } from '../../application/services/transactions.service';
import { CreateTransactionDto } from '../../domain/dto/create-transaction.dto';
import { FindTransactionDto } from '../../domain/dto/find-transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get('/find')
  async find(@Query() findTransactionDto: FindTransactionDto) {
    return this.transactionsService.find(findTransactionDto);
  }

  @Post('/create')
  async create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }
}
