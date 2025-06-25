import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateServiceProviderDto {
  @IsOptional()
  @IsNotEmpty({ message: 'Le prénom ne peut pas être vide.' })
  firstName?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Le nom ne peut pas être vide.' })
  lastName?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Le mail doit être valide.' })
  email?: string;
}
