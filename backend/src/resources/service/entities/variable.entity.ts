import { Expose } from 'class-transformer'

export class VariableEntity {
  @Expose()
  id: string

  @Expose()
  label: string

  @Expose()
  type: string

  @Expose()
  required: boolean
}
