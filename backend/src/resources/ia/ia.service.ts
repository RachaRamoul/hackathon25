import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { decrypt } from '../../common/utils/crypto';
import OpenAI from 'openai';

@Injectable()
export class IaService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(serviceId: string, variables: Record<string, any>) {
    const service = await this.prisma.service.findUnique({
      where: { id: serviceId },
      include: {
        aiConfiguration: true,
        variables: true,
      },
    });

    if (!service || !service.aiConfiguration) {
      throw new NotFoundException(
        'Configuration IA introuvable pour ce service',
      );
    }

    const { model, systemPrompt, defaultPrompt, encryptedApiKey } =
      service.aiConfiguration;
    const apiKey = decrypt(encryptedApiKey);

    // Générer prompt personnalisé
    const prompt = this.interpolatePrompt(
      defaultPrompt,
      service.variables,
      variables,
    );

    const openai = new OpenAI({ apiKey });

    const response = await openai.chat.completions.create({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt },
      ],
    });

    return response.choices[0].message.content;
  }

  private interpolatePrompt(
    template: string,
    fields: any[],
    values: Record<string, any>,
  ): string {
    let result = template;
    for (const field of fields) {
      const key = field.label
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '_')
        .replace(/[^a-z0-9_]/g, '');
      result = result.replaceAll(`{${key}}`, String(values[field.id] ?? ''));
    }
    return result;
  }
}
