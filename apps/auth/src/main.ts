import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { RmqService } from '@app/common';
import { AuthModule } from './auth.module';

async function bootstrap() {

  const app = await NestFactory.create(AuthModule);

  const configService = app.get(ConfigService);
  const rmqService = app.get(RmqService);

  const queue = configService.get('RABBITMQ_AUTH_QUEUE');

  app.connectMicroservice(rmqService.getRmqOptions(queue));
  app.startAllMicroservices();

}

bootstrap();