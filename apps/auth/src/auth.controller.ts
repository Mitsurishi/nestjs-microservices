import { Controller } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { RegistrationDto } from '@app/common';

@Controller()
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @MessagePattern({ cmd: 'registration' })
  async registration(@Ctx() context: RmqContext, @Payload() registrationDto: RegistrationDto) {

    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return this.authService.registration(registrationDto);
  }

}
