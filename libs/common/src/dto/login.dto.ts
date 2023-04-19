import { IsEmail, IsString } from "class-validator";

export class LoginDto {

    @IsEmail()
    @IsString()
    readonly email: string;

    @IsString()
    readonly password: string;

}