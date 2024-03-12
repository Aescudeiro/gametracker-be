import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Country,
  CountryProps,
} from '@/domain/livescore/enterprise/entities/country'
import { PrismaCountryMapper } from '@/infra/database/prisma/mappers/prisma-country-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

export function makeCountry(
  override: Partial<CountryProps> = {},
  id?: UniqueEntityID,
) {
  const country = Country.create(
    {
      name: faker.location.country(),
      alpha: faker.location.countryCode(),
      ...override,
    },
    id,
  )

  return country
}

@Injectable()
export class CountryFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaCountry(data: Partial<CountryProps> = {}): Promise<Country> {
    const country = makeCountry(data)

    await this.prisma.country.create({
      data: PrismaCountryMapper.toPrisma(country),
    })

    return country
  }
}
