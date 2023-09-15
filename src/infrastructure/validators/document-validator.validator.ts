import { cpf } from 'cpf-cnpj-validator';

export function documentValidator(value: any) {
  const isValidDocument = cpf.isValid(value?.document);

  return isValidDocument;
}
