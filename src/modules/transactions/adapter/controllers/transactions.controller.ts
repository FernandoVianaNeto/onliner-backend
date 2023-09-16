import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TransactionsService } from '../../application/services/transactions.service';
import { FindTransactionDto } from '../../domain/dto/find-transaction.dto';
@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get('/find')
  @ApiOperation({
    summary: 'return the transactions total aggregated by store name',
  })
  async findAndSumTotalByStoreName(
    @Query() findTransactionDto: FindTransactionDto,
  ) {
    return this.transactionsService.findAndSumTotalByStoreName(
      findTransactionDto,
    );
  }

  @Get('/find-unsuccessfully')
  @ApiOperation({
    summary: 'return the unsuccessfully transactions',
  })
  async findUnsuccessfullyTransactions(
    @Query() findTransactionDto: FindTransactionDto,
  ) {
    return this.transactionsService.findUnsuccessfullyTransactions(
      findTransactionDto,
    );
  }
}
