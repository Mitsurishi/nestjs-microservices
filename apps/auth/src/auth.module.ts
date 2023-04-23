import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { RmqService, RmqModule, DbModule, User, Role, UserRoles } from '@app/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './services/user.service';
import { RoleService } from './services/role.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    /* ConfigModule.forRoot({
       isGlobal: true,
       envFilePath: '.auth.env',
       validationSchema: Joi.object({
         POSTGRES_HOST: Joi.string().required(),
         POSTGRES_PORT: Joi.number().required(),
         POSTGRES_USER: Joi.string().required(),
         POSTGRES_PASSWORD: Joi.string().required(),
         POSTGRES_DB: Joi.string().required(),
       }),
     }),
     */
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: 'postgres_auth',
        port: 5432,
        username: 'user',
        password: 'password',
        database: 'nestrmq_auth',
        entities: [User, Role, UserRoles],
        synchronize: true,
        autoLoadEntities: true,
        logging: true,
      }),
    }),
    //  DbModule.forRoot([User, Role, UserRoles]),
    TypeOrmModule.forFeature([User, Role, UserRoles]),
    RmqModule.registerRmq('PROFILE_SERVICE', process.env.RABBITMQ_PROFILE_QUEUE),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    RoleService,
    RmqService,
  ],
})
export class AuthModule { }
