import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { EditCountryUseCase } from '@/domain/livescore/application/use-cases/country/edit-country'

const editCountryBodySchema = z.object({
  name: z.string(),
  alpha: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(editCountryBodySchema)

type EditCountryBodySchema = z.infer<typeof editCountryBodySchema>

@Controller('/countries/:id')
export class EditCountryController {
  constructor(private readonly editCountry: EditCountryUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Param('id') id: string,
    @Body(bodyValidationPipe) body: EditCountryBodySchema,
  ) {
    const { name, alpha } = body

    const result = await this.editCountry.execute({
      countryId: id,
      name,
      alpha,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
