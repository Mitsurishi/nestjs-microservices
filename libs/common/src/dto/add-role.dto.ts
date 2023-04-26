import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class AddRoleDto {

    @ApiProperty({ description: 'Название роли', example: 'User' })
    @IsString()
    readonly value: string;

    @ApiProperty({ description: 'Уникальный идентификатор пользователя', example: 1 })
    @IsNumber()
    readonly userId: number;

}