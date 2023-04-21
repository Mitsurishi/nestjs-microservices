import { Profile, RegistrationDto } from '@app/common';
import { Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {

  @InjectRepository(Profile)
  private readonly profileRepository: Repository<Profile>

  async createProfile(payload: RegistrationDto) {
    const profile = this.profileRepository.create({
      name: payload.name,
      surname: payload.surname,
      phone: payload.phone,
      user_id: payload.user_id
    })

    console.log(profile)
    return profile;
  }

}
