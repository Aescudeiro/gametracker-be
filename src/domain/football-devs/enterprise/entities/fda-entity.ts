import { FDAUniqueEntityID } from './fda-unique-entity-id'

export class FDAEntity<Props> {
  private _id: FDAUniqueEntityID
  protected props: Props

  constructor(props: Props, id?: FDAUniqueEntityID) {
    this.props = props
    this._id = id ?? new FDAUniqueEntityID()
  }

  get id() {
    return this._id
  }
}
