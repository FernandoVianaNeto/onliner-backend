import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { json } from 'body-parser';
import { HttpExceptionFilter } from './infrastructure/filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const port = process.env.APP_PORT;

  const app = await NestFactory.create(AppModule, {
    cors: true,
    bodyParser: false,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.use(json({ limit: '1mb' }));

  app.useGlobalFilters(new HttpExceptionFilter());

  process.on('uncaughtException', function () {});

  await app.listen(port, '0.0.0.0', () => {});
}

bootstrap().catch((err) => console.error(err));
