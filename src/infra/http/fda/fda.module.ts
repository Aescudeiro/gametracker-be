import { FDACountriesRepository } from '@/domain/football-devs/application/repositories/fda-countries-repository'
import { FDALeaguesRepository } from '@/domain/football-devs/application/repositories/fda-leagues-repository'
import { EnvService } from '@/infra/env/env.service'
import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { HttpConfigService } from './fda-service'
import { HTTPCountriesRepository } from './repositories/fda-countries-repository'
import { HTTPLeaguesRepository } from './repositories/fda-leagues.repository'

@Module({
  imports: [
    HttpModule.registerAsync({
      extraProviders: [EnvService],
      useClass: HttpConfigService,
    }),
  ],
  providers: [
    {
      provide: FDACountriesRepository,
      useClass: HTTPCountriesRepository,
    },
    {
      provide: FDALeaguesRepository,
      useClass: HTTPLeaguesRepository,
    },
  ],
  exports: [FDACountriesRepository, FDALeaguesRepository],
})
export class FDAModule {}
