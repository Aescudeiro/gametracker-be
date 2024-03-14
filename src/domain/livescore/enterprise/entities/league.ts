import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Slug } from './value-objects/slug'

export interface LeagueProps {
  name: string
  slug: Slug
  countryId: UniqueEntityID
}

export class League extends Entity<LeagueProps> {
  static create(props: Optional<LeagueProps, 'slug'>, id?: UniqueEntityID) {
    const league = new League(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.name),
      },
      id,
    )

    return league
  }

  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get slug() {
    return this.props.slug
  }

  get countryId() {
    return this.props.countryId
  }
}
