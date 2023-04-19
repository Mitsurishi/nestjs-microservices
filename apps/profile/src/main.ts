import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { RmqService } from '@app/common';
import { ProfileModule } from './profile.module';

async function bootstrap() {
  const app = await NestFactory.create(ProfileModule);

  const configService = app.get(ConfigService);
  const rmqService = app.get(RmqService);

  const queue = configService.get('RABBITMQ_PROFILE_QUEUE');

  app.connectMicroservice(rmqService.getRmqOptions(queue));
  app.startAllMicroservices();
}
bootstrap();
