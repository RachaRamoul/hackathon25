import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { UpdateServiceProviderDto } from './dto/update-service-provider.dto';
import { ServiceProviderEntity } from './entities/service-provider.entity';
import { plainToInstance } from 'class-transformer';
import bcrypt from 'bcryptjs';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class ServiceProviderService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: string): Promise<ServiceProviderEntity> {
    const serviceProvider = await this.getserviceProviderOrThrow(id);
    return plainToInstance(ServiceProviderEntity, serviceProvider);
  }

  async findByEmail(email: string): Promise<ServiceProviderEntity> {
    const serviceProvider = await this.prisma.serviceProvider.findUnique({
      where: { email },
    });
    if (!serviceProvider) {
      throw new NotFoundException('Utilisateur introuvable.');
    }
    return plainToInstance(ServiceProviderEntity, serviceProvider);
  }

  async update(
    id: string,
    updateserviceProviderDto: UpdateServiceProviderDto,
  ): Promise<ServiceProviderEntity> {
    await this.getserviceProviderOrThrow(id);

    if (updateserviceProviderDto.email) {
      const serviceProviderWithSameEmail =
        await this.prisma.serviceProvider.findUnique({
          where: { email: updateserviceProviderDto.email },
        });

      if (
        serviceProviderWithSameEmail &&
        serviceProviderWithSameEmail.id !== id
      ) {
        throw new ConflictException('Cet e-mail est déjà utilisé.');
      }
    }

    const updatedserviceProvider = await this.prisma.serviceProvider.update({
      where: { id },
      data: updateserviceProviderDto,
    });

    return plainToInstance(ServiceProviderEntity, updatedserviceProvider);
  }

  async remove(id: string): Promise<ServiceProviderEntity> {
    await this.getserviceProviderOrThrow(id);

    const deletedserviceProvider = await this.prisma.serviceProvider.delete({
      where: { id },
    });

    return plainToInstance(ServiceProviderEntity, deletedserviceProvider);
  }

  async changePassword(
    serviceProviderId: string,
    changePasswordDto: ChangePasswordDto,
  ) {
    const serviceProvider = await this.prisma.serviceProvider.findUnique({
      where: { id: serviceProviderId },
    });
    if (!serviceProvider) throw new NotFoundException();

    const isMatch = await bcrypt.compare(
      changePasswordDto.currentPassword,
      serviceProvider.password,
    );
    if (!isMatch) {
      throw new UnauthorizedException('Mot de passe actuel incorrect');
    }

    const newHashedPassword = await bcrypt.hash(
      changePasswordDto.newPassword,
      10,
    );

    await this.prisma.serviceProvider.update({
      where: { id: serviceProviderId },
      data: { password: newHashedPassword },
    });
  }

  async getserviceProviderOrThrow(id: string) {
    const serviceProvider = await this.prisma.serviceProvider.findUnique({
      where: { id },
    });
    if (!serviceProvider) {
      throw new NotFoundException('Utilisateur introuvable.');
    }
    return serviceProvider;
  }
}
