import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { TransactionsService } from '../../application/services/transactions.service';
import { FindTransactionDto } from '../../domain/dto/find-transaction.dto';
import { AppTokenGuard } from '../../../auth/domain/guards/app-token.guard';
import { Transaction } from '../../domain/schema/transaction.schema';
import { ITransactionSum } from '../../domain/interfaces/transactions-sum';
import { SumTotalByStoreNameDto } from '../../domain/dto/sum-total-by-store-name-return.dto';
import { CreateTransactionDto } from '../../domain/dto/create-transaction.dto';
@ApiTags('Transactions')
@Controller('transactions')
@ApiBearerAuth('app')
@UseGuards(AppTokenGuard)
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get('/find')
  @ApiOperation({
    summary: 'return the transactions total aggregated by store name',
  })
  @ApiOkResponse({
    status: 201,
    description: 'Success Example',
    type: SumTotalByStoreNameDto,
  })
  async findAndSumTotalByStoreName(
    @Query() findTransactionDto: FindTransactionDto,
  ): Promise<ITransactionSum> {
    return this.transactionsService.findAndSumTotalByStoreName(
      findTransactionDto,
    );
  }

  @Get('/find-unsuccessfully')
  @ApiOperation({
    summary: 'return the unsuccessfully transactions',
  })
  @ApiOkResponse({
    status: 201,
    description: 'Success Example',
    type: [CreateTransactionDto],
  })
  async findUnsuccessfullyTransactions(
    @Query() findTransactionDto: FindTransactionDto,
  ): Promise<Transaction[]> {
    return this.transactionsService.findUnsuccessfullyTransactions(
      findTransactionDto,
    );
  }
}
