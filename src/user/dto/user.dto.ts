import { IsNotEmpty, IsString } from "class-validator";
import { BaseDto } from "../../config/base.dto";
import { CustomerEntity } from "../../customer/entities/customer.entity";

export class UserDto extends BaseDto{

    @IsString()
    @IsNotEmpty()
    name!: string;
  
    @IsString()
    @IsNotEmpty()
    lastName!: string;
  
    @IsString()
    @IsNotEmpty()
    userName!: string;
  
    @IsString()
    @IsNotEmpty()
    email!: string;
  
    @IsString()
    @IsNotEmpty()
    password!: string;
  
    @IsString()
    @IsNotEmpty()
    city!: string;
  
    @IsString()
    @IsNotEmpty()
    state!: string;

    @IsNotEmpty()
    role!: RoleType;

}

export enum RoleType {
    USER = "USER",
    CUSTOMER = "CUSTOMER",
    ADMIN = "ADMIN",
}