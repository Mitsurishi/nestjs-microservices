import { RegistrationDto } from '@app/common';
import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService
  ) { }

  async registration(data: RegistrationDto) {

    const { email, password, ...createProfileDto } = data
    return this.userService.createUser(data, createProfileDto)

  }


}

