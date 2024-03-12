import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Slug } from './value-objects/slug'
import { Entity } from '@/core/entities/entity'
import { Optional } from '@/core/types/optional'

export interface CountryProps {
  name: string
  alpha: string
  slug: Slug
}

export class Country extends Entity<CountryProps> {
  static create(props: Optional<CountryProps, 'slug'>, id?: UniqueEntityID) {
    const country = new Country(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.name),
      },
      id,
    )

    return country
  }

  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get alpha() {
    return this.props.alpha
  }

  set alpha(alpha: string) {
    if (alpha.length > 2) {
      throw new Error('Alpha should be 2 characters long')
    }

    this.props.alpha = alpha
  }

  get slug() {
    return this.props.slug
  }
}
