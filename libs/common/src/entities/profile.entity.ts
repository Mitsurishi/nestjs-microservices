import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsInt, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Profile {

    @Type(() => Number)
    @IsInt()
    @ApiProperty({ description: 'Уникальный идентификатор', example: 1 })
    @PrimaryGeneratedColumn()
    id: number;

    @Type(() => String)
    @IsString()
    @ApiProperty({ description: 'Имя пользователя', example: 'Иван' })
    @Column({ type: String })
    name: string;

    @Type(() => String)
    @IsString()
    @ApiProperty({ description: 'Фамилия пользователя', example: 'Иванов' })
    @Column({ type: String })
    surname: string;

    @Type(() => String)
    @IsString()
    @ApiProperty({ description: 'Телефон пользователя', example: '+79206453148' })
    @Column({ type: String })
    phone: string;

    @ApiProperty({ description: 'Уникальный идентификатор пользователя, которому принадлежит профиль', example: 1 })
    @Type(() => Number)
    @IsInt()
    @Column({ type: Number })
    user_id: number;

}