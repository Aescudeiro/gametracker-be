import { randomInt } from 'node:crypto'

export class FDAUniqueEntityID {
  private value: number

  constructor(value?: number) {
    this.value = value ?? randomInt(0, 1000)
  }

  toString() {
    return this.value
  }

  toValue() {
    return this.value
  }
}
