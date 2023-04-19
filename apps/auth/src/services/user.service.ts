import { RegistrationDto, User, UserRoles } from '@app/common';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RoleService } from './role.service';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(UserRoles)
        private readonly userRolesRepository: Repository<UserRoles>,
        private readonly roleService: RoleService,
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


        return user;
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({ where: { email } });
        return user;
    }


}
