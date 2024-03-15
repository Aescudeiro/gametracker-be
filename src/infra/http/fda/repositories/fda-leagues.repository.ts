import { PaginationParams } from '@/core/repositories/pagination-params'
import { FDALeaguesRepository } from '@/domain/football-devs/application/repositories/fda-leagues-repository'
import { FDALeague } from '@/domain/football-devs/enterprise/entities/fda-league'
import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'

@Injectable()
export class HTTPLeaguesRepository implements FDALeaguesRepository {
  constructor(private readonly httpService: HttpService) {}

  async fetchMany({ page }: PaginationParams): Promise<FDALeague[]> {
    const LIMIT = 50

    const response = await firstValueFrom(
      this.httpService.get<FDALeague[]>('leagues', {
        params: {
          limit: LIMIT,
          offset: (page - 1) * LIMIT,
        },
      }),
    )

    return response?.data
  }
}
