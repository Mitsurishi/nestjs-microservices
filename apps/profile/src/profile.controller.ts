import { RegistrationDto } from '@app/common';
import { Controller, Get, Inject } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { ProfileService } from './profile.service';

@Controller()
export class ProfileController {

  constructor(private readonly profileService: ProfileService) { }

  @MessagePattern({ cmd: 'create-profile' })
  async createProfile(@Ctx() context: RmqContext, @Payload() payload: RegistrationDto) {

    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return this.profileService.createProfile(payload);
  }

}
