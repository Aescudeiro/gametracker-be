import { PaginationParams } from '@/core/repositories/pagination-params'
import { FDACountry } from '../../enterprise/entities/fda-country'

export abstract class FDACountriesRepository {
  abstract fetchMany(params: PaginationParams): Promise<FDACountry[]>
}
