import { Module } from '@nestjs/common';
import { PrismaModule } from './database/prisma/prisma.module';
import { ServiceModule } from './resources/service/service.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './resources/auth/auth.module';
import { AiConfigurationModule } from './resources/ai-configuration/ai-configuration.module';
import { IaModule } from './resources/ia/ia.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    ServiceModule,
    AuthModule,
    AiConfigurationModule,
    IaModule,
  ],
})
export class AppModule {}
