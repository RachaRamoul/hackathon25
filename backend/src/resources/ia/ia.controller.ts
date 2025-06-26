import { Body, Controller, Post } from '@nestjs/common';
import { IaService } from './ia.service';
import { ExecuteIaDto } from './dto/execute-ia.dto';

@Controller('ia')
export class IaController {
  constructor(private readonly iaService: IaService) {}

  @Post('execute')
  async execute(@Body() dto: ExecuteIaDto) {
    const response = await this.iaService.execute(dto.serviceId, dto.variables);
    return { response };
  }
}
