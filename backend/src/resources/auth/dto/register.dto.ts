import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsNotEmpty({ message: 'Le prénom ne peut pas être vide.' })
  firstName: string;

  @IsNotEmpty({ message: 'Le nom ne peut pas être vide.' })
  lastName: string;

  @IsNotEmpty({ message: "L'email ne peut pas être vide." })
  @IsEmail({}, { message: 'Le mail doit être valide.' })
  email: string;

  @IsString({ message: 'Le mot de passe est requis.' })
  @MinLength(12, {
    message: 'Le mot de passe doit contenir au moins 12 caractères.',
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {
    message:
      'Le mot de passe doit contenir au moins une lettre majuscule, une minuscule, un chiffre et un symbole.',
  })
  password: string;
}
