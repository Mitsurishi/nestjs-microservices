import { Controller } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { AddRoleDto, CreateRoleDto, LoginDto, RegistrationDto, RmqService, UpdateUserDto } from '@app/common';
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

  @MessagePattern({ cmd: 'get-all-users' })
  async getAllUsers(@Ctx() context: RmqContext) {

    this.rmqService.acknowledgeMessage(context);
    return this.userService.getAllUsers();

  }

  @MessagePattern({ cmd: 'get-user-by-email' })
  async getUserByEmail(@Ctx() context: RmqContext, @Payload() email: string) {

    this.rmqService.acknowledgeMessage(context);
    return this.userService.getUserByEmail(email);

  }

  @MessagePattern({ cmd: 'get-user-by-id' })
  async getUserById(@Ctx() context: RmqContext, @Payload() userId: number) {

    this.rmqService.acknowledgeMessage(context);
    return this.userService.getUserById(userId);

  }

  @MessagePattern({ cmd: 'update-user-by-id' })
  async updateUserById(@Ctx() context: RmqContext, @Payload() userData: [number, UpdateUserDto]) {

    this.rmqService.acknowledgeMessage(context);
    return this.userService.updateUserById(userData[0], userData[1]);

  }

  @MessagePattern({ cmd: 'delete-user-by-id' })
  async deleteUserById(@Ctx() context: RmqContext, @Payload() userId: number) {

    this.rmqService.acknowledgeMessage(context);
    return this.userService.deleteUserById(userId);

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

  @MessagePattern({ cmd: 'delete-role' })
  async deleteRoleByValue(@Ctx() context: RmqContext, @Payload() value: string) {

    this.rmqService.acknowledgeMessage(context);
    return this.roleService.deleteRoleByValue(value);

  }

}
