import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CatModule } from './cat.module';

async function bootstrap() {
  const cats = await NestFactory.create(CatModule);
  await cats.listen(process.env.PORT ?? 3000);
}
bootstrap();
