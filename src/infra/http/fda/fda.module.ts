import { FDACountriesRepository } from '@/domain/football-devs/application/repositories/fda-countries-repository'
import { EnvService } from '@/infra/env/env.service'
import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { HttpConfigService } from './fda-service'
import { HTTPCountriesRepository } from './repositories/fda-countries-repository'

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
  ],
  exports: [FDACountriesRepository],
})
export class FDAModule {}
