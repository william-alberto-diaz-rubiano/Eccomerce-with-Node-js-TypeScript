import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { CategoryDto } from "../dto/category.dto";
import { CategoryEntity } from "../entities/category.entity";


export class CategoryService extends BaseService<CategoryEntity> {

    constructor(){
        super(CategoryEntity);
    }

    async findAllCaterories(): Promise<CategoryEntity[]>{
        return (await this.exeRepository).find();
    }

    async findCategoryById(id: string): Promise<CategoryEntity | null> {
        return (await this.exeRepository).findOneBy({ id });
      }

    async createCategory(body: CategoryDto): Promise<CategoryEntity>{
        return await (await this.exeRepository).save(body);
    }
    
    async deleteCategory(id: string): Promise<DeleteResult> {
        return (await this.exeRepository).delete({ id });
      }
      async updateCategory(id: string, infoUpdate: CategoryDto): Promise<UpdateResult> {
        return (await this.exeRepository).update(id, infoUpdate);
      }
}