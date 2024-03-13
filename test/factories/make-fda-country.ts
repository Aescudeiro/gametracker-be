import {
  FDACountry,
  FDACountryProps,
} from '@/domain/football-devs/enterprise/entities/fda-country'
import { faker } from '@faker-js/faker'

export function makeFDACountry(override: Partial<FDACountryProps> = {}) {
  const country = FDACountry.create({
    name: faker.location.country(),
    alpha: faker.location.countryCode(),
    hash_image: faker.string.alphanumeric(),
    id: faker.number.int(),
    ...override,
  })

  return country
}
