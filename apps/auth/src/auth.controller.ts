import { Controller, Inject } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { RegistrationDto, RmqService } from '@app/common';

@Controller()
export class AuthController {

  constructor(
    private readonly authService: AuthService,
    private readonly rmqService: RmqService,
  ) { }

  @MessagePattern({ cmd: 'registration' })
  async registration(@Ctx() context: RmqContext, @Payload() registrationDto: RegistrationDto) {

    this.rmqService.acknowledgeMessage(context)

    return this.authService.registration(registrationDto)
  }

}
