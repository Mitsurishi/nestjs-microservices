import { LoginDto, RegistrationDto, User, UserRoles } from '@app/common';
import { HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RoleService } from './role.service';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UserService {

    constructor(
        @Inject('PROFILE_SERVICE') private profileService: ClientProxy,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        //  @InjectRepository(UserRoles)
        //  private readonly userRolesRepository: Repository<UserRoles>,
        //  private readonly roleService: RoleService,
    ) { }

    async createUser(dto: RegistrationDto) {
        const candidate = await this.getUserByEmail(dto.email);
        if (candidate) {
            throw new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST)
        }
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(dto.password, salt)
        const user = this.userRepository.create({
            email: dto.email,
            password: hashPassword
        });

        const profilePayload = {
            name: dto.name,
            surname: dto.surname,
            phone: dto.phone,
            user_id: user.id
        }

        const profile = this.profileService.send({ cmd: 'create-profile' }, profilePayload)
        return [user, profile]
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({ where: { email } });
        return user;
    }


    private async validateUser(dto: LoginDto) {
        const user = await this.getUserByEmail(dto.email);
        const passwordEquals = await bcrypt.compare(dto.password, user.password);
        if (user && passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({ message: 'Неправильный email или пароль' })
    }

}
