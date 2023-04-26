import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateProfileDto {

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