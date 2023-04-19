import { IsEmail, IsString } from "class-validator";

export class RegistrationDto {

    @IsEmail()
    @IsString()
    readonly email: string;

    @IsString()
    readonly password: string;

    @IsString()
    readonly name: string;

    @IsString()
    readonly surname: string;

    @IsString()
    readonly phone: string;

}