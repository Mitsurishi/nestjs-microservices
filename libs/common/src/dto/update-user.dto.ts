import { IsEmail, IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @ApiProperty({ description: 'Электронная почта', example: 'example@mail.ru' })
    @IsOptional()
    @IsEmail()
    readonly email: string;

    @ApiProperty({ description: 'Пароль', example: 'password12345' })
    @IsOptional()
    @IsString()
    readonly password: string;

}