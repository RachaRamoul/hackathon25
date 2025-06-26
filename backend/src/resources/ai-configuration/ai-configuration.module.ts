import { Module } from '@nestjs/common';
import { AiConfigurationService } from './ai-configuration.service';
import { AiConfigurationController } from './ai-configuration.controller';

@Module({
  controllers: [AiConfigurationController],
  providers: [AiConfigurationService],
})
export class AiConfigurationModule {}
