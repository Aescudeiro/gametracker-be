import { PaginationParams } from "@/core/repositories/pagination-params";
import { Country } from "@/domain/livescore/enterprise/entities/country";

export abstract class CountriesRepository {
  abstract create(country: Country): Promise<void>;

  abstract findBySlug(slug: string): Promise<Country | null>;

  abstract findById(id: string): Promise<Country | null>;

  abstract findMany(params: PaginationParams): Promise<Country[]>;

  abstract delete(country: Country): Promise<void>;

  abstract save(country: Country): Promise<void>;
}
