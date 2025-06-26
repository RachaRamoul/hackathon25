import { Module } from '@nestjs/common';
import { PrismaModule } from './database/prisma/prisma.module';
import { ServiceModule } from './resources/service/service.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './resources/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    ServiceModule,
    AuthModule,
  ],
})
export class AppModule {}
