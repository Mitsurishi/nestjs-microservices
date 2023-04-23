import { CreateProfileDto, CreateUserDto, LoginDto, RegistrationDto, User, UserRoles } from '@app/common';
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

    async createUser(createUserDto: CreateUserDto, createProfileDto: CreateProfileDto) {
        try {
            const candidate = await this.getUserByEmail(createUserDto.email);
            if (candidate) {
                throw new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST)
            }
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(createUserDto.password, salt)
            const user = this.userRepository.create({
                email: createUserDto.email,
                password: hashPassword
            });

            await this.userRepository.save(user);

            const userId = await this.getUserIdByEmail(createUserDto.email)

            const profileData = {
                name: createProfileDto.name,
                surname: createProfileDto.surname,
                phone: createProfileDto.phone,
                user_id: userId
            }

            const profile = await this.profileService.send({ cmd: 'create-profile' }, profileData)
            await profile.subscribe();
            return [user, profile]
        }
        catch (error) {
            console.log(error);
        }

    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({ where: { email: email } });
        return user;
    }

    private async getUserIdByEmail(email: string) {
        const user = await this.userRepository.findOne({ where: { email: email } });
        const userId = user.id
        return userId;
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
