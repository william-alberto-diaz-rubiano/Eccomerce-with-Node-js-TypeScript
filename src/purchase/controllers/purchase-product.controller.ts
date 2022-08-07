import { HttpResponse } from "../../shared/response/http.response";
import { PurchaseProductService } from "../services/purchase-product.service";
import { Request, Response } from "express";
import { DeleteResult, UpdateResult } from "typeorm";

export class PurchaseProductController {
    constructor(
      private readonly purchaseProductService: PurchaseProductService = new PurchaseProductService(),
      private readonly httpResponse: HttpResponse = new HttpResponse()
    ) {}


    async getPurchaseProducts(_req: Request, res: Response) {
      try {
        const data = await this.purchaseProductService.findAllPurchaseProducts();
        if (data.length === 0) {
          return this.httpResponse.NotFound(res, "Data not found");
        }
        return this.httpResponse.Ok(res, data);
      } catch (error) {
        return this.httpResponse.Error(res, error);
      }
    }

    async getPurchaseProductById(req: Request, res: Response) {
      const { id } = req.params;
      try {
        const data = await this.purchaseProductService.findPurchaseProductById(
          id
        );
        if (!data) {
          return this.httpResponse.NotFound(res, "Data not found");
        }
        return this.httpResponse.Ok(res, data);
      } catch (error) {
        return this.httpResponse.Error(res, error);
      }
    }

    async createPurchaseProduct(req: Request, res: Response) {
      try {
        const data = await this.purchaseProductService.createPurchaseProduct(
          req.body
        );
        return this.httpResponse.Created(res, data);
      } catch (error) {
        return this.httpResponse.Error(res, error);
      }
    }

    async updatePurchaseProduct(req: Request, res: Response) {
      const { id } = req.params;
      try {
        const data: UpdateResult =
          await this.purchaseProductService.updatePurchaseProduct(id, req.body);
  
        if (!data.affected) {
          return this.httpResponse.NotFound(res, "Data not found");
        }
  
        return this.httpResponse.Ok(res, data);
      } catch (error) {
        return this.httpResponse.Error(res, error);
      }
    }

    async deletePurchaseProduct(req: Request, res: Response) {
      const { id } = req.params;
      try {
        const data: DeleteResult =
          await this.purchaseProductService.deletePurchaseProduct(id);
        if (!data.affected) {
          return this.httpResponse.NotFound(res, "Data not found");
        }
  
        return this.httpResponse.Ok(res, data);
      } catch (error) {
        return this.httpResponse.Error(res, error);
      }
    }

    async getPurchaseProductWithExtraInfo(req: Request, res: Response) {
      const { id } = req.params;
      try {
        const data = await this.purchaseProductService.findPurchaseProductWithExtraInfo(id);
        if (!data) {
          return this.httpResponse.NotFound(res, "Data not found");
        }
        return this.httpResponse.Ok(res, data);
      } catch (error) {
        return this.httpResponse.Error(res, error);
      }
    }

  }