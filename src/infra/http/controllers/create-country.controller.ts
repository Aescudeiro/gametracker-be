import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
} from "@nestjs/common";
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { CreateCountryUseCase } from "@/domain/livescore/application/use-cases/create-country";
import { CountryAlreadyExistsError } from "@/domain/livescore/application/use-cases/errors/country-already-exists-error";

const createCountryBodySchema = z.object({
  name: z.string(),
  alpha: z.string(),
  hash_image: z.string(),
});

const bodyValidationPipe = new ZodValidationPipe(createCountryBodySchema);

type CreateCountryBodySchema = z.infer<typeof createCountryBodySchema>;

@Controller("/countries")
export class CreateCountryController {
  constructor(private readonly createCountry: CreateCountryUseCase) {}

  @Post()
  async handle(@Body(bodyValidationPipe) body: CreateCountryBodySchema) {
    const { name, alpha, hash_image: hashImage } = body;

    const result = await this.createCountry.execute({
      name,
      alpha,
      hashImage,
    });

    if (result.isLeft()) {
      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case CountryAlreadyExistsError:
            throw new ConflictException(error.message);
          default:
            throw new BadRequestException(error.message);
        }
      }
    }
  }
}
