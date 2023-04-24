import { CreateProfileDto, CreateUserDto, User, } from '@app/common';
import { HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RoleService } from './role.service';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

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

            const hashPassword = await this.encryptPassword(createUserDto.password);

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

            const profile = await firstValueFrom(this.profileService.send({ cmd: 'create-profile' }, profileData))
            return [user, profile]
        }
        catch (error) {
            return new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }

    }

    async getUserByEmail(email: string) {
        return this.userRepository.findOne({ where: { email: email } });

    }

    private async getUserIdByEmail(email: string) {
        const user = await this.userRepository.findOne({ where: { email: email } });
        const userId = user.id
        return userId;
    }

    private async encryptPassword(password: string) {
        const salt = await bcrypt.genSalt(10)
        return bcrypt.hash(password, salt)
    }

}
