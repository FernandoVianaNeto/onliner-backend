import { CreateTransactionDto } from '../../domain/dto/create-transaction.dto';

export const createTransactionDtoStub = (): CreateTransactionDto => {
  return {
    type: 1,
    date: '20230128',
    value: 201,
    document: '08152141542',
    card: '1234567889987',
    storeOwner: 'Fernando Viana',
    storeName: 'Fernando Viana Dev',
  };
};

export const createUnsuccessfullyTransactionDtoStub =
  (): CreateTransactionDto => {
    return {
      type: 1,
      date: '20230128',
      value: 201,
      document: '08152141541',
      card: '1234567889987',
      storeOwner: 'Fernando Viana',
      storeName: 'Fernando Viana Dev',
      errorMessage: 'Document string must be a valid cpf',
      success: false,
    };
  };
