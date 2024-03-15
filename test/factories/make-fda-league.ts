import {
  FDALeague,
  FDALeagueProps,
} from '@/domain/football-devs/enterprise/entities/fda-league'
import { FDAUniqueEntityID } from '@/domain/football-devs/enterprise/entities/fda-unique-entity-id'
import { faker } from '@faker-js/faker'

export function makeFDALeague(
  override: Partial<FDALeagueProps> = {},
  id?: FDAUniqueEntityID,
) {
  const league = FDALeague.create(
    {
      name: faker.location.city(),
      hash_image: faker.string.alphanumeric(),
      ...override,
    },
    id,
  )

  return league
}
