import { FDAEntity } from './fda-entity'
import { FDAUniqueEntityID } from './fda-unique-entity-id'

export interface FDACountryProps {
  id: number
  name?: string
  alpha: string
  hash_image: string
}

export class FDACountry extends FDAEntity<FDACountryProps> {
  static create(props: FDACountryProps) {
    const country = new FDACountry(
      {
        ...props,
      },
      new FDAUniqueEntityID(props.id),
    )

    return country
  }

  get name() {
    return this.props.name
  }

  get alpha() {
    return this.props.alpha
  }

  get hashImage() {
    return this.props.hash_image
  }
}
