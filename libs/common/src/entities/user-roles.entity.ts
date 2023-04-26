import { Type } from 'class-transformer';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.entity';
import { User } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class UserRoles {

    @Type(() => Number)
    @ApiProperty({ description: 'Уникальный идентификатор', example: 1 })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'Уникальный идентификатор пользователя', example: 1 })
    @ManyToOne(() => User, (user) => user.userRoles, {
        onDelete: 'CASCADE',
    })
    user: User;

    @ApiProperty({ description: 'Уникальный идентификатор роли', example: 1 })
    @ManyToOne(() => Role, (role) => role.userRoles, {
        eager: true,
        onDelete: 'CASCADE',
    })
    role: Role;

}