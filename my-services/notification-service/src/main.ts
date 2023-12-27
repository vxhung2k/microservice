import { RabbitMQService } from './../../../shared/rabbit-MQ/rabbitMQ.service';
import { NestFactory } from '@nestjs/core';
import { AppNotificationModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { RmqOptions } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppNotificationModule);
  const rabbitMQService = app.get<RabbitMQService>(RabbitMQService);
  app.connectMicroservice<RmqOptions>(
    rabbitMQService.getOptions('NOTIFICATION', true),
  );
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  await app.startAllMicroservices();
  await app.listen(configService.get('PORT'));

  app.useGlobalPipes(new ValidationPipe());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('API nestJS ')
    .setDescription('API developed for ecommerce')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
  app.setGlobalPrefix('api');
  logger.log(`==========================================================`);

  logger.log(`Environment Variable`, 'NestApplication');

  logger.log(`==========================================================`);

  logger.log(`Http Server running on ${await app.getUrl()}`, 'NestApplication');
  logger.log(`Database uri connect success`, 'NestApplication');

  logger.log(`==========================================================`);
}
bootstrap();
