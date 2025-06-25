import { Exclude, Expose } from 'class-transformer';

export class ServiceProviderEntity {
  @Expose()
  id: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  email: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<ServiceProviderEntity>) {
    Object.assign(this, partial);
  }
}
