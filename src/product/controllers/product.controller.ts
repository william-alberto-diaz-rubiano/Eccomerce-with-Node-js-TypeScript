import { Request, Response } from "express";
import { HttpResponse } from "../../shared/response/http.response";
import { ProductService } from "../services/pruduct.service";


export class ProductController{

    constructor(private readonly productService: ProductService = new ProductService(),
    private readonly httpResponse: HttpResponse = new HttpResponse){} 

    async getProducts(req: Request, res: Response){
        try {
            const data = await this.productService.findAllProducts();
            if(data.length === 0){
                return this.httpResponse.NotFound(res, "Products not found");
            }
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async getProductById(req: Request, res: Response){
        const {id} = req.params;
        try {
            const data = await this.productService.findProductById(id);
            if(data == null){
                return this.httpResponse.NotFound(res, "Product not found");
            }
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async createProduct(req: Request, res: Response){
        try {
            const data = await this.productService.creteProduct(req.body);
            return this.httpResponse.Created(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async deleteProduct(req: Request, res: Response){
        const {id} = req.params;
        try {
            const data = await this.productService.deleteProduct(id);
            if(!data.affected){
                return this.httpResponse.NotFound(res, "Product not found");
            }
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async updateProduct(req: Request, res: Response){
        const {id} = req.params;
        try {
            const data = await this.productService.updateProduct(id, req.body);
            if(!data.affected){
                return this.httpResponse.NotFound(res, "Product not found");
            }
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }


}