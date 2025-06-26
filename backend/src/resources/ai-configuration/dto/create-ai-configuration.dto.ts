import { IsString, IsUUID } from 'class-validator';

export class CreateAiConfigurationDto {
  @IsUUID()
  serviceId: string;

  @IsString()
  model: string;

  @IsString()
  systemPrompt: string;

  @IsString()
  defaultPrompt: string;

  @IsString()
  apiKey: string;
}
