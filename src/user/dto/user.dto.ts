import { IsNotEmpty, IsString } from "class-validator";
import { BaseDto } from "../../config/base.dto";

export class UserDto extends BaseDto{

    @IsString()
    @IsNotEmpty()
    name!: string;
  
    @IsString()
    @IsNotEmpty()
    lastname!: string;
  
    @IsString()
    @IsNotEmpty()
    username!: string;
  
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

}