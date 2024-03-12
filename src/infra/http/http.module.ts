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

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateCountryController,
    FetchCountriesController,
  ],
  providers: [
    CreateCountryUseCase,
    FetchCountriesUseCase,
    RegisterUserUseCase,
    AuthenticateUserUseCase,
  ],
})
export class HttpModule {}
