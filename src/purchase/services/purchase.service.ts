import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { PurchaseDTO } from "../dto/purchase.dto";
import { PurchaseEntity } from "../entities/purchase.entity";

export class PurchaseService extends BaseService<PurchaseEntity> {
    
    constructor() {
      super(PurchaseEntity);
    }
  
    async findAllPurchases(): Promise<PurchaseEntity[]> {
      return (await this.exeRepository).find();
    }

    async findPurchaseById(id: string): Promise<PurchaseEntity | null> {
      return (await this.exeRepository).findOneBy({ id });
    }

    async createPurchase(body: PurchaseDTO): Promise<PurchaseEntity> {
      return (await this.exeRepository).save(body);
    }

    async deletePurchase(id: string): Promise<DeleteResult> {
      return (await this.exeRepository).delete({ id });
    }

    async updatePurchase(id: string, infoUpdate: PurchaseDTO): Promise<UpdateResult> {
      return (await this.exeRepository).update(id, infoUpdate);
    }
    
  }