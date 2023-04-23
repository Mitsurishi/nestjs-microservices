import { Type } from 'class-transformer';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.entity';
import { User } from './user.entity';

@Entity()
export class UserRoles {

    @Type(() => Number)
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.userRoles, {
        onDelete: 'CASCADE',
    })
    user: User;

    @ManyToOne(() => Role, (role) => role.userRoles, {
        eager: true,
        onDelete: 'CASCADE',
    })
    role: Role;

}