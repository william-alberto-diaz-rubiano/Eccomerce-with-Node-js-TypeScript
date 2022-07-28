import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { ProductDto } from "../dto/product.dto";
import { ProductEntity } from "../entities/product.entity";

export class ProductService extends BaseService<ProductEntity>{

    constructor(){
        super(ProductEntity);
    }

    async findAllProducts(): Promise<ProductEntity[]> {
        return (await this.exeRepository).find();
    }

    async findProductById(id: string): Promise<ProductEntity | null> {
        return (await this.exeRepository).findOneBy({ id });
    }

    async creteProduct(body: ProductDto): Promise<ProductDto>{
        return (await this.exeRepository).save(body);
    }

    async deleteProduct(id: string): Promise<DeleteResult>{
        return (await this.exeRepository).delete(id);
    }

    async updateProduct(id: string, body: ProductDto): Promise<UpdateResult>{
        return (await this.exeRepository).update(id, body);
    }


}