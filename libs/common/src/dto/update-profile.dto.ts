import { IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileDto } from './create-profile.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {

    @ApiProperty({ description: 'Имя пользователя', example: 'Иван' })
    @IsOptional()
    @IsString()
    readonly name: string;

    @ApiProperty({ description: 'Фамилия пользователя', example: 'Иванов' })
    @IsOptional()
    @IsString()
    readonly surname: string;

    @ApiProperty({ description: 'Телефон пользователя', example: '+79206453148' })
    @IsOptional()
    @IsString()
    readonly phone: string;

}