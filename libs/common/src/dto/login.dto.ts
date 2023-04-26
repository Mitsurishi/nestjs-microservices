import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class LoginDto {

    @ApiProperty({ description: 'Электронная почта', example: 'example@mail.ru' })
    @IsEmail()
    @IsString()
    readonly email: string;

    @ApiProperty({ description: 'Пароль', example: 'password12345' })
    @IsString()
    readonly password: string;

}