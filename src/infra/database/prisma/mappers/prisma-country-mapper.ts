import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Country } from '@/domain/livescore/enterprise/entities/country'
import { Slug } from '@/domain/livescore/enterprise/entities/value-objects/slug'
import { Prisma, Country as PrismaCountry } from '@prisma/client'

export class PrismaCountryMapper {
  static toDomain(raw: PrismaCountry): Country {
    return Country.create(
      {
        name: raw.name,
        alpha: raw.alpha,
        slug: Slug.create(raw.slug),
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(country: Country): Prisma.CountryUncheckedCreateInput {
    return {
      id: country.id.toString(),
      name: country.name,
      alpha: country.alpha,
      slug: country.slug.value,
    }
  }
}
