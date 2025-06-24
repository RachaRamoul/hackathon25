import { Body, Controller, Post } from '@nestjs/common'
import { FormService } from './form.service'

@Controller('forms')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Post()
  async createForm(@Body() body: any) {
    return this.formService.createForm(body)
  }
}
