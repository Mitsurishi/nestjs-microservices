import { CreateRoleDto, Role } from '@app/common';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {

    constructor(

        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,

    ) { }

    async createRole(createRoleDto: CreateRoleDto) {

        const checkRole = await this.getRoleByValue(createRoleDto.value);
        if (checkRole) {
            throw new HttpException('Такая роль уже существует', HttpStatus.BAD_REQUEST)
        }
        const role = await this.roleRepository.save(createRoleDto);
        return role;

    }

    async getAllRoles() {

        return this.roleRepository.find();

    }

    async getRoleByValue(value: string) {

        const role = await this.roleRepository.findOne({ where: { value: value } });
        if (role) {
            return role;
        }
        throw new HttpException(`Роль со значением ${value} не найдена`, HttpStatus.NOT_FOUND)

    }

    async getRoleIdByValue(value: string) {

        const role = await this.roleRepository.findOne({ where: { value: value } });
        if (role) {
            return role.id;
        }
        throw new HttpException(`Роль со значением ${value} не найдена`, HttpStatus.NOT_FOUND)

    }

    async deleteRoleByValue(value: string) {

        const role = await this.roleRepository.findOne({ where: { value: value } });
        if (role) {
            return this.roleRepository.remove(role);
        }
        throw new HttpException(`Роль со значением ${value} не найдена`, HttpStatus.NOT_FOUND)

    }

}