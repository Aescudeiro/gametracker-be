import { EnvService } from '@/infra/env/env.service'
import { HttpModuleOptions, HttpModuleOptionsFactory } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'

@Injectable()
export class HttpConfigService implements HttpModuleOptionsFactory {
  constructor(private readonly env: EnvService) {}

  createHttpOptions(): HttpModuleOptions {
    const xRapidAPIKey = this.env.get('X_RAPIDAPI_KEY')
    const xRapidAPIHost = this.env.get('X_RAPIDAPI_HOST')
    const fdaAPIUrl = this.env.get('FDA_API_URL')

    return {
      baseURL: fdaAPIUrl,
      headers: {
        'X-RapidAPI-Key': xRapidAPIKey,
        'X-RapidAPI-Host': xRapidAPIHost,
      },
    }
  }
}
