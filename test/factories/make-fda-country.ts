import {
  FDACountry,
  FDACountryProps,
} from '@/domain/football-devs/enterprise/entities/fda-country'
import { FDAUniqueEntityID } from '@/domain/football-devs/enterprise/entities/fda-unique-entity-id'
import { faker } from '@faker-js/faker'

export function makeFDACountry(
  override: Partial<FDACountryProps> = {},
  id?: FDAUniqueEntityID,
) {
  const country = FDACountry.create(
    {
      name: faker.location.country(),
      alpha: faker.location.countryCode(),
      hash_image: faker.string.alphanumeric(),
      ...override,
    },
    id,
  )

  return country
}
