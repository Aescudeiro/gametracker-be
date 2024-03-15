import { FDAEntity } from './fda-entity'
import { FDAUniqueEntityID } from './fda-unique-entity-id'

export interface FDALeagueProps {
  name?: string
  class_name?: string
  hash_image: string
}

export class FDALeague extends FDAEntity<FDALeagueProps> {
  static create(props: FDALeagueProps, id?: FDAUniqueEntityID) {
    const league = new FDALeague(
      {
        ...props,
      },
      id,
    )

    return league
  }

  get name() {
    return this.props.name
  }

  get class_name() {
    return this.props.class_name
  }

  get hash_image() {
    return this.props.hash_image
  }
}
