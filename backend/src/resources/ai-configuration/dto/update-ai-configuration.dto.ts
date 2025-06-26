import { PartialType } from '@nestjs/mapped-types';
import { CreateAiConfigurationDto } from './create-ai-configuration.dto';

export class UpdateAiConfigurationDto extends PartialType(CreateAiConfigurationDto) {}
