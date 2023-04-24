import { LoginDto, RegistrationDto } from '@app/common';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService
  ) { }

  async registration(data: RegistrationDto) {

    const { email, password, ...createProfileDto } = data

    return this.userService.createUser({ email, password }, createProfileDto)

  }

  private async validateUser(dto: LoginDto) {
    const user = await this.userService.getUserByEmail(dto.email);
    const passwordEquals = await bcrypt.compare(dto.password, user.password);
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({ message: 'Неправильный email или пароль' })
  }

}

