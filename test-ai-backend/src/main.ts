import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  /* console.log(
    `MONGO_DB`,
    `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`,
  ); */
  const app = await NestFactory.create(AppModule);
  await app.listen(5000);
}
bootstrap();
