import { LoginDto, RegistrationDto, User } from '@app/common';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(

    private readonly userService: UserService,
    private readonly jwtService: JwtService

  ) { }

  async registration(data: RegistrationDto) {

    const { email, password, ...createProfileDto } = data;
    const user = await this.userService.createUser({ email, password }, createProfileDto);
    return this.generateToken(user)

  }

  async login(data: LoginDto) {

    const user = await this.validateUser(data);
    return this.generateToken(user)

  }

  private async validateUser(dto: LoginDto) {

    const user = await this.userService.getUserByEmail(dto.email);
    const passwordEquals = await bcrypt.compare(dto.password, user.password);
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({ message: 'Неправильный email или пароль' })

  }

  private async generateToken(user: User) {

    const userRoles = user?.userRoles?.map((element) => element.role.value) ?? []
    const payload = { email: user.email, id: user.id, userRoles: userRoles }
    return {
      token: this.jwtService.sign(payload)
    }

  }

}

