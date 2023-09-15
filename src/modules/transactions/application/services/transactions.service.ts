import { BadRequestException, Injectable } from '@nestjs/common';
import { documentValidator } from '../../../../infrastructure/validators/document-validator.validator';
import { CreateTransactionDto } from '../../domain/dto/create-transaction.dto';
import { FindTransactionDto } from '../../domain/dto/find-transaction.dto';
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

    await this.transactionRepository.create({
      ...createTransactionDto,
      success: false,
      message: 'Document string must be a valid cpf',
    });

    throw new BadRequestException('Document string must be a valid cpf');
  }

  async find(findTransactionDto: FindTransactionDto) {
    return this.transactionRepository.findAndSumTotalByStoreName(
      findTransactionDto,
    );
  }
}
