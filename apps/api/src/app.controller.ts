import { AddRoleDto, CreateRoleDto, LoginDto, RegistrationDto, Roles, RolesGuard, UpdateProfileDto } from '@app/common';
import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(

    @Inject('AUTH_SERVICE') private authService: ClientProxy,
    @Inject('PROFILE_SERVICE') private profileService: ClientProxy

  ) { }

  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiResponse({ status: 200 })
  @Post('auth/registration')
  async registration(@Body() registrationDto: RegistrationDto) {

    return this.authService.send({ cmd: 'registration' }, registrationDto);

  }

  @ApiOperation({ summary: 'Авторизация пользователя' })
  @ApiResponse({ status: 200 })
  @Post('auth/login')
  async login(@Body() loginDto: LoginDto) {

    return this.authService.send({ cmd: 'login' }, loginDto);

  }

  @ApiOperation({ summary: 'Создание роли' })
  @ApiResponse({ status: 200 })
  @Roles('Admin')
  @UseGuards(RolesGuard)
  @Post('role/create')
  async createRole(@Body() createRoleDto: CreateRoleDto) {

    return this.authService.send({ cmd: 'create-role' }, createRoleDto);

  }


  @ApiOperation({ summary: 'Присвоение роли пользователю' })
  @ApiResponse({ status: 200 })
  @Roles('Admin')
  @UseGuards(RolesGuard)
  @Post('role/add')
  async addRoleToUser(@Body() addRoleDto: AddRoleDto) {

    return this.authService.send({ cmd: 'add-role' }, addRoleDto);

  }


  @ApiOperation({ summary: 'Получение всех пользователей' })
  @ApiResponse({ status: 200 })
  @Roles('Admin')
  @UseGuards(RolesGuard)
  @Get('users')
  async getAllUsers() {

    return this.authService.send({ cmd: 'get-all-users' }, {});

  }

  @ApiOperation({ summary: 'Получение пользователя по email' })
  @ApiResponse({ status: 200 })
  @Roles('User')
  @UseGuards(RolesGuard)
  @Get('user')
  async getUserByEmail(@Body() email: string) {

    return this.authService.send({ cmd: 'get-user-by-email' }, email);

  }

  @ApiOperation({ summary: 'Получение пользователя и его профиля по id' })
  @ApiResponse({ status: 200 })
  @Roles('Admin', 'User')
  @UseGuards(RolesGuard)
  @Get('user/:userId')
  async getUserById(@Param('userId') userId: string) {

    return this.authService.send({ cmd: 'get-user-by-id' }, +userId);

  }

  @ApiOperation({ summary: 'Удаление пользователя и его профиля по id' })
  @ApiResponse({ status: 200 })
  @Roles('Admin', 'User')
  @UseGuards(RolesGuard)
  @Delete('user/:userId')
  async deleteUserById(@Param('userId') userId: string) {

    return this.authService.send({ cmd: 'delete-user-by-id' }, +userId);

  }


  @ApiOperation({ summary: 'Получение профиля по id пользователя' })
  @ApiResponse({ status: 200 })
  @Roles('Admin', 'User')
  @UseGuards(RolesGuard)
  @Get('profile/:userId')
  async getProfileByUserId(@Param('userId') userId: string) {

    return this.authService.send({ cmd: 'get-profile-by-userId' }, +userId);

  }

  @ApiOperation({ summary: 'Редактирование профиля по id пользователя' })
  @ApiResponse({ status: 200 })
  @Roles('Admin', 'User')
  @UseGuards(RolesGuard)
  @Patch('profile/:userId')
  async updateProfileByUserId(@Param('userId') userId: string, @Body() updateProfileDto: UpdateProfileDto) {

    return this.authService.send({ cmd: 'update-profile-by-userId' }, [+userId, updateProfileDto]);

  }

}
