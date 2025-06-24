import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../database/prisma/prisma.service'

@Injectable()
export class FormService {
  constructor(private readonly prisma: PrismaService) {}

  async createForm(data: { title: string; variables: any[] }) {
    const { title, variables } = data

    return this.prisma.form.create({
      data: {
        title,
        variables: {
          create: variables.map((v) => ({
            label: v.label,
            type: v.type,
            required: v.required,
          })),
        },
      },
      include: { variables: true },
    })
  }
}


