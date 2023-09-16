import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { json } from 'body-parser';
import { HttpExceptionFilter } from './infrastructure/filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  const swaggerOptions = new DocumentBuilder()
    .setTitle('Onliner - API')
    .setDescription('Onliner - API')
    .setExternalDoc('Download JSON', '/docs-json')
    .addBearerAuth({ type: 'http' }, 'App')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions, {
    ignoreGlobalPrefix: false,
  });
  SwaggerModule.setup('/docs', app, document);

  app.use(json({ limit: '1mb' }));

  app.useGlobalFilters(new HttpExceptionFilter());

  process.on('uncaughtException', function () {});

  await app.listen(port, '0.0.0.0', () => {});
}

bootstrap().catch((err) => console.error(err));
