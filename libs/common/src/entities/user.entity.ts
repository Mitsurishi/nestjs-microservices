import { Type } from "class-transformer";
import { IsEmail, IsInt, IsString } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserRoles } from "./user-roles.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class User {

    @Type(() => Number)
    @IsInt()
    @ApiProperty({ description: 'Уникальный идентификатор', example: 1 })
    @PrimaryGeneratedColumn()
    id: number;

    @Type(() => String)
    @IsEmail()
    @ApiProperty({ description: 'Электронная почта', example: 'example@mail.ru' })
    @Column({ type: String })
    email: string;

    @Type(() => String)
    @IsString()
    @ApiProperty({ description: 'Пароль', example: 'password12345' })
    @Column({ type: String })
    password: string;

    @ApiProperty({ description: 'Роли пользователя', example: 'Admin, User' })
    @OneToMany(() => UserRoles, (userRoles) => userRoles.user, { eager: true })
    userRoles: UserRoles[];

}