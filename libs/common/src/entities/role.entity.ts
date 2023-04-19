import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { UserRoles } from './user-roles.entity';

@Entity()
export class Role {

    @Type(() => Number)
    @IsInt()
    @PrimaryGeneratedColumn()
    id: number;

    @Type(() => String)
    @IsString()
    @Column({ type: String, unique: true, nullable: false })
    value: string;

    @Type(() => String)
    @IsString()
    @Column({ type: String })
    description: string;

    @OneToMany(() => UserRoles, (userRoles) => userRoles.role)
    userRoles: UserRoles[];

}