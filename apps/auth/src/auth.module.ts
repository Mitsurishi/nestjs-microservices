import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RmqService, RmqModule, DbModule } from '@app/common';

@Module({
  imports: [
    RmqModule,
    DbModule
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
