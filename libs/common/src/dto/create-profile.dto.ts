import { IsString } from "class-validator";

export class CreateProfileDto {

    @IsString()
    readonly name: string;

    @IsString()
    readonly surname: string;

    @IsString()
    readonly phone: string;

}