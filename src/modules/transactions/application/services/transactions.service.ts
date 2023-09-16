import { Injectable } from '@nestjs/common';
import { documentValidator } from '../../../../infrastructure/validators/document-validator.validator';
import { CreateTransactionDto } from '../../domain/dto/create-transaction.dto';
import { FindTransactionDto } from '../../domain/dto/find-transaction.dto';
import { ITransactionSum } from '../../domain/interfaces/transactions-sum';
import { Transaction } from '../../domain/schema/transaction.schema';
import { TransactionRepository } from '../repositories/transaction.repository';

@Injectable()
export class TransactionsService {
  constructor(private transactionRepository: TransactionRepository) {}

  async create(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    const { document } = createTransactionDto;

    const isValidDocument = documentValidator(document);

    if (isValidDocument)
      return this.transactionRepository.create(createTransactionDto);

    return this.transactionRepository.create({
      ...createTransactionDto,
      success: false,
      errorMessage: 'Document string must be a valid cpf',
    });
  }

  async findAndSumTotalByStoreName(
    findTransactionDto: FindTransactionDto,
  ): Promise<ITransactionSum> {
    return this.transactionRepository.findAndSumTotalByStoreName(
      findTransactionDto,
    );
  }

  async findUnsuccessfullyTransactions(
    findTransactionDto: FindTransactionDto,
  ): Promise<Transaction[]> {
    return this.transactionRepository.findUnsuccessfullyTransactions(
      findTransactionDto,
    );
  }
}
