import { RegistrationDto, User } from '@app/common';
import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService
  ) { }

  async registration(registrationDto: RegistrationDto) {

    return this.userService.createUser(registrationDto)

  }


}

