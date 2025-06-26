import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { encrypt } from 'src/common/utils/crypto';

@Injectable()
export class ServiceService {
  constructor(private readonly prisma: PrismaService) {}

  async createService(data: CreateServiceDto) {
    const {
      name,
      description,
      type,
      price,
      serviceProviderId,
      variables,
      defaultPrompt,
      model,
      systemPrompt,
      apiKey,
    } = data;
    const provider = await this.prisma.serviceProvider.findUnique({
      where: { id: serviceProviderId },
    });

    if (!provider) {
      throw new NotFoundException('Fournisseur de service introuvable.');
    }

    const service = await this.prisma.service.create({
      data: {
        name,
        description,
        type,
        price,
        serviceProviderId,
        variables: {
          create: variables.map((v) => ({
            label: v.label,
            type: v.type,
            required: v.required,
          })),
        },
      },
      include: {
        variables: true,
        serviceProvider: true,
      },
    });

    await this.prisma.aiConfiguration.create({
      data: {
        model,
        systemPrompt,
        defaultPrompt,
        encryptedApiKey: encrypt(apiKey),
        serviceId: service.id,
      },
    });

    return service;
  }

  findAll() {
    return this.prisma.service.findMany({
      include: {
        variables: true,
        serviceProvider: true,
      },
    });
  }

  async findOne(id: string) {
    const service = await this.prisma.service.findUnique({
      where: { id },
      include: {
        variables: true,
        serviceProvider: true,
      },
    });

    if (!service) {
      throw new NotFoundException('Service introuvable');
    }

    return service;
  }
}
