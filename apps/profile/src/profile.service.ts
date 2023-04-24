import { CreateProfileDto, Profile, RegistrationDto } from '@app/common';
import { Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {

  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>
  ) { }

  async createProfile(createProfileDto: CreateProfileDto) {

    const profileData = this.profileRepository.create(createProfileDto);
    const profile = await this.profileRepository.save(profileData);
    return profile;

  }

  async getProfileByUserId(userId: number) {

    const profile = await this.profileRepository.findOne({ where: { user_id: userId } });
    return profile;

  }



}
