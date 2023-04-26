import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class RegistrationDto {

    @ApiProperty({ description: 'Электронная почта', example: 'example@mail.ru' })
    @IsEmail()
    @IsString()
    readonly email: string;

    @ApiProperty({ description: 'Пароль', example: 'password12345' })
    @IsString()
    readonly password: string;

    @ApiProperty({ description: 'Имя пользователя', example: 'Иван' })
    @IsString()
    readonly name: string;

    @ApiProperty({ description: 'Фамилия пользователя', example: 'Иванов' })
    @IsString()
    readonly surname: string;

    @ApiProperty({ description: 'Телефон пользователя', example: '+79206453148' })
    @IsString()
    readonly phone: string;

}