import { CreateProfileDto, RegistrationDto, RmqService } from '@app/common';
import { Controller, Get, Inject } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { ProfileService } from './profile.service';

@Controller()
export class ProfileController {

  constructor(
    private readonly profileService: ProfileService,
    private readonly rmqService: RmqService
  ) { }

  @MessagePattern({ cmd: 'create-profile' })
  async createProfile(@Ctx() context: RmqContext, @Payload() createProfileDto: CreateProfileDto) {

    this.rmqService.acknowledgeMessage(context);

    return this.profileService.createProfile(createProfileDto);
  }

}
