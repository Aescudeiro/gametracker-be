import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import {
  Country,
  CountryProps,
} from "@/domain/livescore/enterprise/entities/country";
import { faker } from "@faker-js/faker";

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
  );

  return country;
}
