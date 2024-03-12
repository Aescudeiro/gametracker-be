import { PaginationParams } from "@/core/repositories/pagination-params";
import { CountriesRepository } from "@/domain/livescore/application/repositories/countries-repository";
import { Country } from "@/domain/livescore/enterprise/entities/country";

export class InMemoryCountriesRepository implements CountriesRepository {
  public items: Country[] = [];

  async create(country: Country): Promise<void> {
    this.items.push(country);
  }

  async findBySlug(slug: string): Promise<Country | null> {
    const country = this.items.find((country) => country.slug.value === slug);

    if (!country) {
      return null;
    }

    return country;
  }

  async findById(id: string): Promise<Country | null> {
    const country = this.items.find((country) => country.id.toString() === id);

    if (!country) {
      return null;
    }

    return country;
  }

  async findMany({ page }: PaginationParams): Promise<Country[]> {
    const countries = this.items.slice((page - 1) * 20, page * 20);

    return countries;
  }

  async delete(country: Country): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === country.id);

    this.items.splice(itemIndex, 1);
  }

  async save(country: Country): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === country.id);

    this.items[itemIndex] = country;
  }
}
