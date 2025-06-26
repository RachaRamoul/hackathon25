import { IsString, IsNotEmpty, IsObject } from 'class-validator';

export class ExecuteIaDto {
  @IsString()
  @IsNotEmpty()
  serviceId: string;

  @IsObject()
  @IsNotEmpty()
  variables: Record<string, string | boolean | number>;
}
