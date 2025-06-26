import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsBoolean,
  ValidateNested,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

class VariableDto {
  @IsString({ message: 'Le label est requis.' })
  @IsNotEmpty({ message: 'Le label ne peut pas être vide.' })
  label: string;

  @IsString({ message: 'Le type est requis.' })
  @IsNotEmpty({ message: 'Le type ne peut pas être vide.' })
  type: string;

  @IsBoolean({ message: 'Le champ requis doit être un booléen.' })
  required: boolean;
}

export class CreateServiceDto {
  @IsString({ message: 'Le nom est requis.' })
  @IsNotEmpty({ message: 'Le nom ne peut pas être vide.' })
  name: string;

  @IsString({ message: 'La description est requise.' })
  @IsNotEmpty({ message: 'La description ne peut pas être vide.' })
  description: string;

  @IsString({ message: 'Le type est requis.' })
  @IsNotEmpty({ message: 'Le type ne peut pas être vide.' })
  type: string;

  @IsNumber({}, { message: 'Le prix doit être un nombre.' })
  price: number;

  @IsString({ message: "L'ID du prestataire est requis." })
  @IsNotEmpty({ message: "L'ID du prestataire ne peut pas être vide." })
  serviceProviderId: string;

  @IsArray({ message: 'Les variables doivent être une liste.' })
  @ValidateNested({ each: true })
  @Type(() => VariableDto)
  variables: VariableDto[];

  @IsString()
  @IsNotEmpty()
  defaultPrompt: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsString()
  @IsNotEmpty()
  systemPrompt: string;

  @IsString()
  @IsNotEmpty()
  apiKey: string;
}
