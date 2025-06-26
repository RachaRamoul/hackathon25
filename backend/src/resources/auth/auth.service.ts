import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { plainToInstance } from 'class-transformer';
import { RegisterDto } from './dto/register.dto';
import { ServiceProviderEntity } from '../service-provider/entities/service-provider.entity';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async login(serviceProvider: ServiceProviderEntity) {
    const payload = {
      id: serviceProvider.id,
      email: serviceProvider.email,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async register(
    createServiceProviderDto: RegisterDto,
  ): Promise<ServiceProviderEntity> {
    const existingUser = await this.prisma.serviceProvider.findUnique({
      where: { email: createServiceProviderDto.email },
    });

    if (existingUser) {
      throw new ConflictException(
        'Un utilisateur avec cet e-mail existe déjà.',
      );
    }
    const hashedPassword = await bcrypt.hash(
      createServiceProviderDto.password,
      10,
    );

    const serviceProvider = await this.prisma.serviceProvider.create({
      data: {
        ...createServiceProviderDto,
        password: hashedPassword,
      },
    });

    return plainToInstance(ServiceProviderEntity, serviceProvider);
  }

  async validateServiceProvider(email: string, password: string) {
    const serviceProvider = await this.findByEmail(email);
    if (!serviceProvider)
      throw new UnauthorizedException('Email ou mot de passe incorrect.');

    const isMatchPassword = await bcrypt.compare(
      password,
      serviceProvider.password,
    );
    if (!isMatchPassword)
      throw new UnauthorizedException('Email ou mot de passe incorrect.');

    return serviceProvider;
  }

  async findByEmail(email: string) {
    return this.prisma.serviceProvider.findUnique({ where: { email } });
  }
}
