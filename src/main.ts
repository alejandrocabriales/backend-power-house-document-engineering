import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);

  // Add limit to the body parser
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  // Serve static files from uploads directory
  app.use(
    '/file/upload',
    express.static(join(__dirname, '..', 'static', 'uploads')),
  );

  // Configure CORS after the middleware
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3001);
  logger.log(`Server is running on port ${process.env.PORT ?? 3001}`);
}
void bootstrap();
