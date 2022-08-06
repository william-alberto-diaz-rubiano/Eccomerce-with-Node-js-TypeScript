import { Request, Response } from "express";
import { HttpResponse } from "../../shared/response/http.response";
import { CategoryService } from "../services/category.service";

export class CategoryController{

    constructor(private readonly categoryService: CategoryService = new CategoryService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()) {}


    async getCategories(req: Request, res: Response){
      try {
        
        const data = await this.categoryService.findAllCaterories();
        if(data.length === 0){
          return this.httpResponse.NotFound(res, "Category not found");
        } 
        return this.httpResponse.Ok(res, data);
      } catch (error) {
        return this.httpResponse.Error(res, error);
      }
    }


    async getCategoryById(req: Request, res: Response){
        const {id} = req.params;
        try {
          const data = await this.categoryService.findCategoryById(id);
          if(data == null){
            return this.httpResponse.NotFound(res, "Category not found");
          }
          return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);;
        }
      }


      async createCategory(req: Request, res: Response){
        try {
          const data = await this.categoryService.createCategory(req.body);
          return this.httpResponse.Created(res, data);
        } catch (error) {
          return this.httpResponse.Error(res, error);
        }
      }


      async updateCategory(req: Request, res: Response){
        const {id} = req.params;
        try {
          const data = await this.categoryService.updateCategory(id, req.body);
          if(!data.affected){
            return this.httpResponse.NotFound(res, "Category not found");
          }
          return this.httpResponse.Ok(res, data); 
        } catch (error) {
          return this.httpResponse.Error(res, error);
        }
      }


      async deleteCategory(req: Request, res: Response){
        const {id} = req.params;
        try {
          const data = await this.categoryService.deleteCategory(id);
          if(!data.affected){
            return this.httpResponse.NotFound(res, "Category not found");
          }
          return this.httpResponse.Ok(res, data);
        } catch (error) {
          return this.httpResponse.Error(res, error);
        }
      }

      async getCategoryWithProducts(req: Request, res: Response){
        const {id} = req.params;
        try {
          const data = await this.categoryService.findAllCateroriesWithProducts(id);
          if(data == null){
            return this.httpResponse.NotFound(res, "Category not found");
          }
          return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);;
        }
      }
}