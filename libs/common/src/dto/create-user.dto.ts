import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {

    @IsEmail()
    @IsString()
    readonly email: string;

    @IsString()
    readonly password: string;

}