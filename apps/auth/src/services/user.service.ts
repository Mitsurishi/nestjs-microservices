import { AddRoleDto, CreateProfileDto, CreateUserDto, User, UserRoles, } from '@app/common';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
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
        @InjectRepository(UserRoles)
        private readonly userRolesRepository: Repository<UserRoles>,
        private readonly roleService: RoleService,

    ) { }

    async createUser(createUserDto: CreateUserDto, createProfileDto: CreateProfileDto) {

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
        await firstValueFrom(this.profileService.send({ cmd: 'create-profile' }, profileData))
        const defaultRole = await this.roleService.getRoleByValue('User');
        await this.addRoleToUser({ value: defaultRole.value, userId: user.id })
        return user

    }

    async getUserById(userId: number) {

        const user = await this.userRepository.findOne({
            where: { id: userId },
            select: { id: true, email: true, userRoles: true }
        });
        if (user) {
            const profile = await firstValueFrom(this.profileService.send({ cmd: 'get-profile-by-userId' }, userId));
            return [user, profile]
        }
        throw new HttpException(`Пользователь с id: ${userId} не найден`, HttpStatus.NOT_FOUND);

    }

    async getUserByEmail(email: string) {

        return this.userRepository.findOne({ where: { email: email } })

    }

    async getAllUsers() {

        const users = await this.userRepository.find({ select: { id: true, email: true, userRoles: true } });
        return users;

    }

    async addRoleToUser(addRoleDto: AddRoleDto) {

        const user = await this.userRepository.findOne({ where: { id: addRoleDto.userId } });
        const role = await this.roleService.getRoleByValue(addRoleDto.value);
        if (role && user) {
            const userRole = this.userRolesRepository.create({ user, role })
            await this.userRolesRepository.save(userRole)
            return userRole;
        }
        throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND);

    }

    async deleteUserById(userId: number) {

        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (user) {
            await this.userRepository.remove(user);
            await firstValueFrom(this.profileService.send({ cmd: 'delete-profile-by-userId' }, userId))
            return `Пользователь с id: ${userId} и его профиль успешно удалены`
        }
        throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);

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
