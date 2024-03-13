import { randomInt } from 'node:crypto'

export class FDAUniqueEntityID {
  private value: number

  constructor(value?: number) {
    this.value =
      value ?? randomInt(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)
  }

  toString() {
    return this.value
  }

  toValue() {
    return this.value
  }
}
