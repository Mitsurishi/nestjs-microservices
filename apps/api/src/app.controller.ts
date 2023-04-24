import { AddRoleDto, CreateRoleDto, LoginDto, RegistrationDto } from '@app/common';
import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    @Inject('AUTH_SERVICE') private authService: ClientProxy,
    @Inject('PROFILE_SERVICE') private profileService: ClientProxy
  ) { }

  @Post('auth/registration')
  async registration(@Body() registrationDto: RegistrationDto) {
    return this.authService.send({ cmd: 'registration' }, registrationDto);
  }

  @Post('auth/login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.send({ cmd: 'login' }, loginDto);
  }

  @Post('role/create')
  async createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.authService.send({ cmd: 'create-role' }, createRoleDto);
  }

  @Post('role/add')
  async addRoleToUser(@Body() addRoleDto: AddRoleDto) {
    return this.authService.send({ cmd: 'add-role' }, addRoleDto);
  }

  @Get('users')
  async getAllUsers() {
    return this.authService.send({ cmd: 'get-all-users' }, {});
  }

  @Get('user/:userId')
  async getUserById(@Param('userId') userId: string) {
    return this.authService.send({ cmd: 'get-user-by-id' }, +userId);
  }


}
