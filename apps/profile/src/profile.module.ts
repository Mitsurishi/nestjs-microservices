import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { DbModule, Profile, RmqModule, RmqService } from '@app/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({

  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/profile/.profile.env',
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
      }),
    }),
    DbModule.forRoot([Profile]),
    TypeOrmModule.forFeature([Profile]),
    RmqModule.registerRmq('PROFILE_SERVICE', process.env.RABBITMQ_PROFILE_QUEUE),
  ],
  controllers: [ProfileController],
  providers: [
    ProfileService,
    RmqService,
  ],

})

export class ProfileModule { }
