import { FDACountriesRepository } from '@/domain/football-devs/application/repositories/fda-countries-repository'
import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { HTTPCountriesRepository } from './repositories/fda-countries-repository'
import { EnvService } from '@/infra/env.service'

@Module({
  imports: [
    HttpModule.registerAsync({
      extraProviders: [EnvService],
      inject: [EnvService],
      useFactory(env: EnvService) {
        const rapidApiKey = env.get('X_RAPIDAPI_KEY')
        const rapidApiHost = env.get('X_RAPIDAPI_HOST')

        return {
          headers: {
            'X-RapidAPI-Key': rapidApiKey,
            'X-RapidAPI-Host': rapidApiHost,
          },
        }
      },
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
