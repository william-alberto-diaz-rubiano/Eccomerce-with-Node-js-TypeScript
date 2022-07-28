import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { CategoryEntity } from "../../category/entities/category.entity";
import { BaseDto } from "../../config/base.dto";
import { PurchaseProductEntity } from "../../purchase/entities/purchase-products.entity";

export class ProductDto extends BaseDto{

    @IsString()
    @IsNotEmpty()
    productName!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;

    @IsNumber()
    @IsNotEmpty()
    price!: number;

    @IsNotEmpty()
    category!: CategoryEntity;

    purchaseProduct!: PurchaseProductEntity[];
}