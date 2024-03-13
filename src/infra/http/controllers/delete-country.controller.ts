import { DeleteCountryUseCase } from '@/domain/livescore/application/use-cases/country/delete-country'
import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'

@Controller('/countries/:id')
export class DeleteCountryController {
  constructor(private readonly deleteCountry: DeleteCountryUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(@Param('id') id: string) {
    const result = await this.deleteCountry.execute({
      countryId: id,
    })

    if (result.isLeft()) {
      throw new BadRequestException(result.value.message)
    }
  }
}
