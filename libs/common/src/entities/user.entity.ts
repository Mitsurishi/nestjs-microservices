import { Type } from "class-transformer";
import { IsEmail, IsInt, IsString } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserRoles } from "./user-roles.entity";

@Entity()
export class User {

    @Type(() => Number)
    @IsInt()
    @PrimaryGeneratedColumn()
    id: number;

    @Type(() => String)
    @IsEmail()
    @Column({ type: String })
    email: string;

    @Type(() => String)
    @IsString()
    @Column({ type: String })
    password: string;

    @OneToMany(() => UserRoles, (userRoles) => userRoles.user, { eager: true })
    userRoles: UserRoles[];

}