import { Body, Controller, Post, Get, Param } from '@nestjs/common'
import { FormService } from './form.service'

interface CreateFormDto {
  title: string
  description: string
  type: string
  variables: { label: string; type: string; required: boolean }[]
}

@Controller('forms')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Post()
  async createForm(@Body() body: CreateFormDto) {
    return this.formService.createForm(body)
  }

  @Get()
  findAll() {
    return this.formService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formService.findOne(id)
  }
}
