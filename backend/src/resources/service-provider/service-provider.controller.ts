import { Controller, Get, Body, Patch, Delete } from '@nestjs/common';
import { ServiceProviderService } from './service-provider.service';
import { UpdateServiceProviderDto } from './dto/update-service-provider.dto';
import { CurrentServiceProvider } from 'src/common/decorators/current-service-provider.decorator';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('serviceProviders')
export class ServiceProviderController {
  constructor(
    private readonly serviceProviderService: ServiceProviderService,
  ) {}

  @Get('me')
  getProfile(@CurrentServiceProvider() serviceProvider: JwtPayload) {
    return this.serviceProviderService.findOne(serviceProvider.id);
  }

  @Patch('me')
  updateProfile(
    @CurrentServiceProvider() serviceProvider: JwtPayload,
    @Body() updateServiceProviderDto: UpdateServiceProviderDto,
  ) {
    return this.serviceProviderService.update(
      serviceProvider.id,
      updateServiceProviderDto,
    );
  }

  @Patch('me/password')
  changePassword(
    @CurrentServiceProvider() serviceProvider: JwtPayload,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.serviceProviderService.changePassword(
      serviceProvider.id,
      changePasswordDto,
    );
  }

  @Delete('me')
  deleteAccount(@CurrentServiceProvider() serviceProvider: JwtPayload) {
    return this.serviceProviderService.remove(serviceProvider.id);
  }
}
