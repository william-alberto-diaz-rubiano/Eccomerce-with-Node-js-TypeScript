import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { CustomerDto } from "../dto/customer.dto";
import { CustomerEntity } from "../entities/customer.entity";


export class CustomerService extends BaseService<CustomerEntity> {

    constructor(){
        super(CustomerEntity);
    }

    async findAllCustomers(): Promise<CustomerEntity[]>{
        return (await this.exeRepository).find();
    }

    async findCustomerById(id: string): Promise<CustomerEntity | null> {
        return (await this.exeRepository).findOneBy({ id });
      }

    async createCustomer(body: CustomerDto): Promise<CustomerEntity>{
        return await (await this.exeRepository).save(body);
    }
    
    async deleteCustomer(id: string): Promise<DeleteResult> {
        return (await this.exeRepository).delete({ id });
      }
      async updateCustomer(id: string, infoUpdate: CustomerDto): Promise<UpdateResult> {
        return (await this.exeRepository).update(id, infoUpdate);
      }

      async findCustomerWithUser(id: string): Promise<CustomerEntity | null> {
        return (await this.exeRepository)
        .createQueryBuilder('customer')
        .leftJoinAndSelect('customer.user','user')
        .where({id})
        .getOne();
      }

      async findCustomerWithPurchases(id: string): Promise<CustomerEntity[]> {
        return (await this.exeRepository)
        .createQueryBuilder('customer')
        .leftJoinAndSelect('customer.purchases','purchases')
        .where({id})
        .getMany();
      }
}