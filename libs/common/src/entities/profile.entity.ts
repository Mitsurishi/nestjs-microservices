import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsInt, IsString } from 'class-validator';
import { Type } from 'class-transformer';

@Entity()
export class Profile {

    @Type(() => Number)
    @IsInt()
    @PrimaryGeneratedColumn()
    id: number;

    @Type(() => String)
    @IsString()
    @Column({ type: String })
    name: string;

    @Type(() => String)
    @IsString()
    @Column({ type: String })
    surname: string;

    @Type(() => String)
    @Column({ type: String })
    phone: string;

    @Type(() => Number)
    @IsInt()
    @Column({ type: Number })
    user_id: number;

}