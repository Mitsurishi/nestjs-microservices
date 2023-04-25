import { Controller, Inject } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { AddRoleDto, CreateRoleDto, LoginDto, RegistrationDto, RmqService } from '@app/common';
import { RoleService } from './services/role.service';
import { UserService } from './services/user.service';

@Controller()
export class AuthController {

  constructor(

    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly roleService: RoleService,
    private readonly rmqService: RmqService,

  ) { }

  @MessagePattern({ cmd: 'registration' })
  async registration(@Ctx() context: RmqContext, @Payload() registrationDto: RegistrationDto) {

    this.rmqService.acknowledgeMessage(context);
    return this.authService.registration(registrationDto);

  }

  @MessagePattern({ cmd: 'login' })
  async login(@Ctx() context: RmqContext, @Payload() loginDto: LoginDto) {

    this.rmqService.acknowledgeMessage(context);
    return this.authService.login(loginDto);

  }

  @MessagePattern({ cmd: 'create-role' })
  async createRole(@Ctx() context: RmqContext, @Payload() createRoleDto: CreateRoleDto) {

    this.rmqService.acknowledgeMessage(context);
    return this.roleService.createRole(createRoleDto);

  }

  @MessagePattern({ cmd: 'add-role' })
  async addRoleToUser(@Ctx() context: RmqContext, @Payload() addRoleDto: AddRoleDto) {

    this.rmqService.acknowledgeMessage(context);
    return this.userService.addRoleToUser(addRoleDto);

  }

  @MessagePattern({ cmd: 'get-all-users' })
  async getAllUsers(@Ctx() context: RmqContext) {

    this.rmqService.acknowledgeMessage(context);
    return this.userService.getAllUsers();

  }

  @MessagePattern({ cmd: 'get-user-by-id' })
  async getUserById(@Ctx() context: RmqContext, @Payload() userId: number) {

    this.rmqService.acknowledgeMessage(context);
    return this.userService.getUserById(userId);

  }

  @MessagePattern({ cmd: 'delete-user-by-id' })
  async deleteUserById(@Ctx() context: RmqContext, @Payload() userId: number) {

    this.rmqService.acknowledgeMessage(context);
    return this.userService.deleteUserById(userId);

  }

}
