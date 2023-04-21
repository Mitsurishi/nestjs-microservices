import { Module } from '@nestjs/common';
import { RmqModule } from '@app/common';
import { AppController } from './app.controller';

@Module({
  imports: [
    RmqModule.registerRmq('AUTH_SERVICE', process.env.RABBITMQ_AUTH_QUEUE),
    RmqModule.registerRmq('PROFILE_SERVICE', process.env.RABBITMQ_PROFILE_QUEUE),
  ],
  controllers: [AppController],
})
export class AppModule { }
