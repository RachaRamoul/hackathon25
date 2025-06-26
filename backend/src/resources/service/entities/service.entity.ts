import { Expose, Type } from 'class-transformer'
import { VariableEntity } from './variable.entity'

export class ServiceEntity {
  @Expose()
  id: string

  @Expose()
  name: string

  @Expose()
  description: string

  @Expose()
  type: string

  @Expose()
  createdAt: Date

  @Expose()
  updatedAt: Date

  @Expose()
  serviceProviderId: string

  @Expose()
  @Type(() => VariableEntity)
  variables: VariableEntity[]

  constructor(partial: Partial<ServiceEntity>) {
    Object.assign(this, partial)
  }
}
