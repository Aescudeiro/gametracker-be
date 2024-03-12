import { UseCaseError } from '@/core/errors/use-case-error'

export class CountryAlreadyExistsError extends Error implements UseCaseError {
  constructor(indentifier: string) {
    super(`Country ${indentifier} already exists`)
  }
}
