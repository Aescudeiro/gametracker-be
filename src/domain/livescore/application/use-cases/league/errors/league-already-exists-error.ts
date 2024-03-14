import { UseCaseError } from '@/core/errors/use-case-error'

export class LeagueAlreadyExistsError extends Error implements UseCaseError {
  constructor(indentifier: string) {
    super(`League ${indentifier} already exists`)
  }
}
