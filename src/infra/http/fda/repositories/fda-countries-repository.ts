import { PaginationParams } from '@/core/repositories/pagination-params'
import { FDACountriesRepository } from '@/domain/football-devs/application/repositories/fda-countries-repository'
import { FDACountry } from '@/domain/football-devs/enterprise/entities/fda-country'
import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'

@Injectable()
export class HTTPCountriesRepository implements FDACountriesRepository {
  constructor(private readonly httpService: HttpService) {}

  async fetchMany({ page }: PaginationParams): Promise<FDACountry[]> {
    const LIMIT = 50

    const response = await this.httpService.axiosRef.get<FDACountry[]>(
      'countries',
      {
        params: {
          limit: LIMIT,
          offset: (page - 1) * LIMIT,
        },
      },
    )

    return response.data
  }
}
