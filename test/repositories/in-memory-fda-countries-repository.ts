import { PaginationParams } from '@/core/repositories/pagination-params'
import { FDACountriesRepository } from '@/domain/football-devs/application/repositories/fda-countries-repository'
import { FDACountry } from '@/domain/football-devs/enterprise/entities/fda-country'

export class InMemoryFDACountriesRepository implements FDACountriesRepository {
  public items: FDACountry[] = []

  async create(country: FDACountry): Promise<void> {
    this.items.push(country)
  }

  async fetchMany({ page }: PaginationParams): Promise<FDACountry[]> {
    const countries = this.items.slice((page - 1) * 20, page * 20)

    return countries
  }
}
