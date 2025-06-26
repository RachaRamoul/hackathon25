import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../database/prisma/prisma.service'

@Injectable()
export class FormService {
  constructor(private readonly prisma: PrismaService) {}

  async createForm(data: { title: string; description: string; type: string; variables: any[] }) {
    
    const { title, description, type, variables } = data
    return this.prisma.form.create({
      data: {
        title,
        description,
        type,       
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

  findAll() {
    return this.prisma.form.findMany()
  }
  
  findOne(id: string) {
    return this.prisma.form.findUnique({
      where: { id },
      include: { variables: true },
    })
  }
  
}


