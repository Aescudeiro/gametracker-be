import { Module } from '@nestjs/common'

import { FetchCountriesFromFDAUseCase } from '@/domain/football-devs/application/use-cases/country/fetch-countries-from-fda'
import { FetchLeaguesFromFDAUseCase } from '@/domain/football-devs/application/use-cases/league/fetch-leagues-from-fda'
import { AuthenticateUserUseCase } from '@/domain/livescore/application/use-cases/auth/authenticate-user'
import { RegisterUserUseCase } from '@/domain/livescore/application/use-cases/auth/register-user'
import { CreateCountryUseCase } from '@/domain/livescore/application/use-cases/country/create-country'
import { DeleteCountryUseCase } from '@/domain/livescore/application/use-cases/country/delete-country'
import { EditCountryUseCase } from '@/domain/livescore/application/use-cases/country/edit-country'
import { FetchCountriesUseCase } from '@/domain/livescore/application/use-cases/country/fetch-countries'
import { GetCountryBySlugUseCase } from '@/domain/livescore/application/use-cases/country/get-country-by-slug'
import { CreateLeagueUseCase } from '@/domain/livescore/application/use-cases/league/create-league'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateAccountController } from './controllers/create-account.controller'
import { CreateCountryController } from './controllers/create-country.controller'
import { CreateLeagueController } from './controllers/create-league.controller'
import { DeleteCountryController } from './controllers/delete-country.controller'
import { EditCountryController } from './controllers/edit-country.controller'
import { FetchCountriesFromFDAController } from './controllers/fetch-countries-from-fda.controller'
import { FetchCountriesController } from './controllers/fetch-countries.controller'
import { FetchLeaguesFromFDAController } from './controllers/fetch-leagues-from-fda.controller'
import { GetCountryBySlugController } from './controllers/get-country-by-slug.controller'
import { FDAModule } from './fda/fda.module'

@Module({
  imports: [DatabaseModule, CryptographyModule, FDAModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateCountryController,
    FetchCountriesController,
    GetCountryBySlugController,
    EditCountryController,
    DeleteCountryController,
    FetchCountriesFromFDAController,
    CreateLeagueController,
    FetchLeaguesFromFDAController,
  ],
  providers: [
    CreateCountryUseCase,
    FetchCountriesUseCase,
    RegisterUserUseCase,
    AuthenticateUserUseCase,
    GetCountryBySlugUseCase,
    EditCountryUseCase,
    DeleteCountryUseCase,
    FetchCountriesFromFDAUseCase,
    CreateLeagueUseCase,
    FetchLeaguesFromFDAUseCase,
  ],
})
export class HttpModule {}
