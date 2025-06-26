import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { CreateAiConfigurationDto } from './dto/create-ai-configuration.dto';
import { encrypt } from '../../common/utils/crypto';

@Injectable()
export class AiConfigurationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateAiConfigurationDto) {
    const encryptedKey = encrypt(dto.apiKey);
    return this.prisma.aiConfiguration.create({
      data: {
        model: dto.model,
        systemPrompt: dto.systemPrompt,
        defaultPrompt: dto.defaultPrompt,
        encryptedApiKey: encryptedKey,
        serviceId: dto.serviceId,
      },
    });
  }

  async findByServiceId(serviceId: string) {
    return this.prisma.aiConfiguration.findUnique({
      where: { serviceId },
    });
  }
}
