import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { ProductService } from "../../product/services/pruduct.service";
import { PurchaseProductDTO } from "../dto/purchase-product.dto";
import { PurchaseProductEntity } from "../entities/purchase-products.entity";

export class PurchaseProductService extends BaseService<PurchaseProductEntity> {

    constructor(private readonly productService: ProductService = new ProductService()) {
      super(PurchaseProductEntity);
    }
  
    async findAllPurchaseProducts(): Promise<PurchaseProductEntity[]> {
      return (await this.exeRepository).find();
    }

    async findPurchaseProductById(id: string): Promise<PurchaseProductEntity | null> {
      return (await this.exeRepository).findOneBy({ id });
    }
  
    async createPurchaseProduct(body: PurchaseProductDTO): Promise<PurchaseProductEntity> {
      const newPurchaseProduct = (await this.exeRepository).create(body);
      const product = await this.productService.findProductById(newPurchaseProduct.product.id);
      newPurchaseProduct.totalPrice = product!.price * newPurchaseProduct.quantityProduct;
      return (await this.exeRepository).save(newPurchaseProduct);
    }
  
    async deletePurchaseProduct(id: string): Promise<DeleteResult> {
      return (await this.exeRepository).delete({ id });
    }

    async updatePurchaseProduct(id: string, infoUpdate: PurchaseProductDTO): Promise<UpdateResult> {
      return (await this.exeRepository).update(id, infoUpdate);
    }

    async findPurchaseProductWithExtraInfo(id: string): Promise<PurchaseProductEntity | null> {
      return (await this.exeRepository).createQueryBuilder('purchases_products')
      .leftJoinAndSelect('purchases_products.product', 'product')
      .leftJoinAndSelect('purchases_products.purchase', 'purchase')
      .where({id})
      .getOne();
    }

  }