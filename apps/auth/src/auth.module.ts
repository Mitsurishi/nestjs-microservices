import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RmqService, RmqModule, DbModule, User, Profile, Role, UserRoles } from '@app/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    RmqModule,
    DbModule,
    TypeOrmModule.forFeature([User, Profile, Role, UserRoles]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: 'RmqServiceInterface',
      useClass: RmqService,
    },
  ],
})
export class AuthModule { }
