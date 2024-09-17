import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ValidationExceptionFilter } from './utils/validation-exception.filter';
import * as compression from 'compression';
import { getEnvOrThrow } from './utils/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip unknown properties from DTOs
    }),
  );
  app.use(compression());

  // Register global filters
  app.useGlobalFilters(new ValidationExceptionFilter());

  await app.listen(getEnvOrThrow('APP_PORT'));

  printAppInfo(app);
}

async function printAppInfo(app: any): Promise<void> {
  // Get the application URL
  const url = await app.getUrl();

  // Replace IPv6 localhost with IPv4 localhost
  const formattedUrl = url.replace('[::1]', 'localhost');
  console.log(`Application is running on: ${formattedUrl}`);
}

bootstrap();
