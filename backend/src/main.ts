import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Autoriser le frontend sur http://localhost:5173
  app.enableCors({
    origin: 'http://localhost:5173',
  });

  await app.listen(3000);
}
bootstrap();
