import { cpf } from 'cpf-cnpj-validator';

export function documentValidator(document: string) {
  const isValidDocument = cpf.isValid(document);

  return isValidDocument;
}
