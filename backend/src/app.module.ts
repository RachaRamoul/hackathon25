import { Module } from '@nestjs/common';
import { PrismaModule } from './database/prisma/prisma.module';
import { FormModule } from './resources/form/form.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './resources/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    FormModule,
    AuthModule,
  ],
})
export class AppModule {}
