import { Module } from '@nestjs/common'
import { FormController } from './form.controller'
import { FormService } from './form.service'
import { PrismaModule } from '../../database/prisma/prisma.module'

@Module({
  imports: [PrismaModule],
  controllers: [FormController],
  providers: [FormService],
})
export class FormModule {}
