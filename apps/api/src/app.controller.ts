import { AddRoleDto, CreateRoleDto, JwtAuthGuard, LoginDto, Profile, RegistrationDto, Role, Roles, RolesGuard, UpdateProfileDto, UpdateUserDto, User } from '@app/common';
import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('API gateway')
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

  @ApiOperation({ summary: 'Получение всех пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  @Roles('Admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('users')
  async getAllUsers() {

    return this.authService.send({ cmd: 'get-all-users' }, {});

  }

  @ApiOperation({ summary: 'Получение пользователя по email' })
  @ApiResponse({ status: 200, type: User })
  @Roles('Admin', 'User')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('user')
  async getUserByEmail(@Body() email: string) {

    return this.authService.send({ cmd: 'get-user-by-email' }, email);

  }

  @ApiOperation({ summary: 'Получение пользователя и его профиля по id' })
  @ApiResponse({ status: 200, type: User })
  @Roles('Admin', 'User')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('user/:userId')
  async getUserById(@Param('userId') userId: string) {

    return this.authService.send({ cmd: 'get-user-by-id' }, +userId);

  }

  @ApiOperation({ summary: 'Редактирование пользователя по id' })
  @ApiResponse({ status: 200, type: User })
  @Roles('Admin', 'User')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('user/:userId')
  async updateUserById(@Param('userId') userId: string, @Body() updateUserDto: UpdateUserDto) {

    return this.authService.send({ cmd: 'update-user-by-id' }, [+userId, updateUserDto]);

  }

  @ApiOperation({ summary: 'Удаление пользователя и его профиля по id' })
  @ApiResponse({ status: 200 })
  @Roles('Admin', 'User')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('user/:userId')
  async deleteUserById(@Param('userId') userId: string) {

    return this.authService.send({ cmd: 'delete-user-by-id' }, +userId);

  }

  @ApiOperation({ summary: 'Создание роли' })
  @ApiResponse({ status: 200, type: Role })
  @Roles('Admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('role/create')
  async createRole(@Body() createRoleDto: CreateRoleDto) {

    return this.authService.send({ cmd: 'create-role' }, createRoleDto);

  }

  @ApiOperation({ summary: 'Присвоение роли пользователю' })
  @ApiResponse({ status: 200 })
  @Roles('Admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('role/add')
  async addRoleToUser(@Body() addRoleDto: AddRoleDto) {

    return this.authService.send({ cmd: 'add-role' }, addRoleDto);

  }

  @ApiOperation({ summary: 'Удаление роли по названию' })
  @ApiResponse({ status: 200 })
  @Roles('Admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('role/delete')
  async deleteRoleByValue(@Body() value: string) {

    return this.authService.send({ cmd: 'delete-role' }, value);

  }

  @ApiOperation({ summary: 'Получение всех профилей' })
  @ApiResponse({ status: 200, type: [Profile] })
  @Roles('Admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('profiles')
  async getAllProfiles() {

    return this.profileService.send({ cmd: 'get-all-profiles' }, {});

  }

  @ApiOperation({ summary: 'Получение профиля по id пользователя' })
  @ApiResponse({ status: 200, type: [Profile] })
  @Roles('Admin', 'User')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('profile/:userId')
  async getProfileByUserId(@Param('userId') userId: string) {

    return this.profileService.send({ cmd: 'get-profile-by-userId' }, +userId);

  }

  @ApiOperation({ summary: 'Редактирование профиля по id пользователя' })
  @ApiResponse({ status: 200, type: Profile })
  @Roles('Admin', 'User')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('profile/:userId')
  async updateProfileByUserId(@Param('userId') userId: string, @Body() updateProfileDto: UpdateProfileDto) {

    return this.profileService.send({ cmd: 'update-profile-by-userId' }, [+userId, updateProfileDto]);

  }

}
