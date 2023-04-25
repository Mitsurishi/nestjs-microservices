import { CreateProfileDto, RegistrationDto, RmqService, UpdateProfileDto } from '@app/common';
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

  @MessagePattern({ cmd: 'get-profile-by-userId' })
  async getProfileByUserId(@Ctx() context: RmqContext, @Payload() userId: number) {

    this.rmqService.acknowledgeMessage(context);
    return this.profileService.getProfileByUserId(userId);

  }

  @MessagePattern({ cmd: 'update-profile-by-userId' })
  async updateProfileByUserId(@Ctx() context: RmqContext, @Payload() profileData: [number, UpdateProfileDto]) {

    this.rmqService.acknowledgeMessage(context);
    return this.profileService.updateProfileByUserId(profileData[0], profileData[1]);

  }

  @MessagePattern({ cmd: 'delete-profile-by-userId' })
  async deleteProfileByUserId(@Ctx() context: RmqContext, @Payload() userId: number) {

    this.rmqService.acknowledgeMessage(context);
    return this.profileService.deleteProfileByUserId(userId);

  }

}
