import { IsNotEmpty, IsString } from "class-validator";
import { BaseDto } from "../../config/base.dto";
import { UserEntity } from "../../user/entities/user.entity";


export class CustomerDto extends BaseDto{

    @IsString()
    @IsNotEmpty()
    address!: string;

    @IsString()
    @IsNotEmpty()
    dni!: string;

    @IsNotEmpty()
    user!: UserEntity;

}