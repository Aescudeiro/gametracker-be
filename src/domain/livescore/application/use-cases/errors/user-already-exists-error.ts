import { UseCaseError } from "@/core/errors/use-case-error";

export class UserAlreadyExistsError extends Error implements UseCaseError {
  constructor(indentifier: string) {
    super(`User with email ${indentifier} already exists`);
  }
}
