import { Module } from '@nestjs/common'

import { CreateAccountController } from './controllers/create-account.controller'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateCountryController } from './controllers/create-country.controller'
import { FetchCountriesController } from './controllers/fetch-countries.controller'
import { DatabaseModule } from '../database/database.module'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { GetCountryBySlugController } from './controllers/get-country-by-slug.controller'
import { EditCountryController } from './controllers/edit-country.controller'
import { DeleteCountryController } from './controllers/delete-country.controller'
import { CreateCountryUseCase } from '@/domain/livescore/application/use-cases/auth/create-country'
import { FetchCountriesUseCase } from '@/domain/livescore/application/use-cases/country/fetch-countries'
import { RegisterUserUseCase } from '@/domain/livescore/application/use-cases/country/register-user'
import { AuthenticateUserUseCase } from '@/domain/livescore/application/use-cases/auth/authenticate-user'
import { GetCountryBySlugUseCase } from '@/domain/livescore/application/use-cases/country/get-country-by-slug'
import { EditCountryUseCase } from '@/domain/livescore/application/use-cases/country/edit-country'
import { DeleteCountryUseCase } from '@/domain/livescore/application/use-cases/country/delete-country'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateCountryController,
    FetchCountriesController,
    GetCountryBySlugController,
    EditCountryController,
    DeleteCountryController,
  ],
  providers: [
    CreateCountryUseCase,
    FetchCountriesUseCase,
    RegisterUserUseCase,
    AuthenticateUserUseCase,
    GetCountryBySlugUseCase,
    EditCountryUseCase,
    DeleteCountryUseCase,
  ],
})
export class HttpModule {}
