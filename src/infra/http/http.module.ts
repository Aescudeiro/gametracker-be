import { Module } from "@nestjs/common";

import { CreateAccountController } from "./controllers/create-account.controller";
import { AuthenticateController } from "./controllers/authenticate.controller";
import { CreateCountryController } from "./controllers/create-country.controller";
import { FetchCountriesController } from "./controllers/fetch-countries.controller";
import { DatabaseModule } from "../database/database.module";
import { CreateCountryUseCase } from "@/domain/livescore/application/use-cases/create-country";
import { FetchCountriesUseCase } from "@/domain/livescore/application/use-cases/fetch-countries";
import { RegisterUserUseCase } from "@/domain/livescore/application/use-cases/register-user";
import { AuthenticateUserUseCase } from "@/domain/livescore/application/use-cases/authenticate-user";
import { CryptographyModule } from "../cryptography/cryptography.module";
import { GetCountryBySlugController } from "./controllers/get-country-by-slug.controller";
import { GetCountryBySlugUseCase } from "@/domain/livescore/application/use-cases/get-country-by-slug";
import { EditCountryController } from "./controllers/edit-country.controller";
import { EditCountryUseCase } from "@/domain/livescore/application/use-cases/edit-country";

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateCountryController,
    FetchCountriesController,
    GetCountryBySlugController,
    EditCountryController,
  ],
  providers: [
    CreateCountryUseCase,
    FetchCountriesUseCase,
    RegisterUserUseCase,
    AuthenticateUserUseCase,
    GetCountryBySlugUseCase,
    EditCountryUseCase,
  ],
})
export class HttpModule {}
