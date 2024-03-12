import { Country } from '@/domain/livescore/enterprise/entities/country'

export class CountryPresenter {
  static toHTTP(country: Country) {
    return {
      id: country.id.toString(),
      name: country.name,
      alpha: country.alpha,
      slug: country.slug.value,
    }
  }
}
