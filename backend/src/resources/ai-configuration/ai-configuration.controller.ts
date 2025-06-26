import { Body, Controller, Post } from '@nestjs/common';
import { AiConfigurationService } from './ai-configuration.service';
import { CreateAiConfigurationDto } from './dto/create-ai-configuration.dto';

@Controller('ai-configurations')
export class AiConfigurationController {
  constructor(private readonly aiConfigService: AiConfigurationService) {}

  @Post()
  create(@Body() dto: CreateAiConfigurationDto) {
    return this.aiConfigService.create(dto);
  }
}
