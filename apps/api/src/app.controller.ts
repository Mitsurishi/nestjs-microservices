import { LoginDto, RegistrationDto } from '@app/common';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    @Inject('AUTH_SERVICE') private authService: ClientProxy
  ) { }

  @Post('auth/registration')
  async registration(@Body() registrationDto: RegistrationDto) {
    return this.authService.send({ cmd: 'registration', }, registrationDto);
  }

  @Post('auth/login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.send({ cmd: 'login', }, loginDto);
  }

}
