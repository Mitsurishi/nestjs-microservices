import { CreateProfileDto, Profile, RegistrationDto, UpdateProfileDto } from '@app/common';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async updateProfileByUserId(userId: number, updateProfileDto: UpdateProfileDto) {

    await this.profileRepository.update({
      user_id: userId
    }, {
      name: updateProfileDto.name,
      surname: updateProfileDto.surname,
      phone: updateProfileDto.phone
    })
    return this.profileRepository.findOne({ where: { user_id: userId } })

  }

  async deleteProfileByUserId(userId: number) {

    const profile = await this.profileRepository.findOne({ where: { user_id: userId } });
    if (profile) {
      return this.profileRepository.remove(profile)
    }
    throw new HttpException(`Профиль не найден`, HttpStatus.NOT_FOUND)

  }



}
