import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class CreateRoleDto {

    @ApiProperty({ description: 'Название роли', example: 'User' })
    @IsString()
    readonly value: string;

    @ApiProperty({ description: 'Описание роли', example: 'Обычный пользователь. Данная роль присваевается при регистрации' })
    @IsString()
    readonly description: string;

}