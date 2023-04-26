import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { UserRoles } from './user-roles.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Role {

    @Type(() => Number)
    @IsInt()
    @ApiProperty({ description: 'Уникальный идентификатор', example: 1 })
    @PrimaryGeneratedColumn()
    id: number;

    @Type(() => String)
    @IsString()
    @ApiProperty({ description: 'Название роли', example: 'User' })
    @Column({ type: String, unique: true, nullable: false })
    value: string;

    @Type(() => String)
    @IsString()
    @ApiProperty({ description: 'Описание роли', example: 'Обычный пользователь. Данная роль присваевается при регистрации' })
    @Column({ type: String })
    description: string;

    @OneToMany(() => UserRoles, (userRoles) => userRoles.role)
    userRoles: UserRoles[];

}