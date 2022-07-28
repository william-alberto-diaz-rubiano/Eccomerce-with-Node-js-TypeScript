import { IsNotEmpty, IsString } from "class-validator";
import { BaseDto } from "../../config/base.dto";

export class CategoryDto extends BaseDto{

    @IsString()
    @IsNotEmpty()
    categoryName!: string;
}