import { Request, Response } from "express";
import { CustomerService } from "../services/customer.service";

export class CustomerController{

    constructor(private readonly customerService: CustomerService = new CustomerService()) {}


    async getCustomers(req: Request, res: Response){
      try {
        
        const data = await this.customerService.findAllCustomers();
        return res.status(200).json(data);
      } catch (error) {
        console.log(error);
      }
    }


    async getCustomerById(req: Request, res: Response){
        const {id} = req.params;
        try {
          const data = await this.customerService.findCustomerById(id);
          return res.status(200).json(data);
        } catch (error) {
            console.log(error);
        }
      }


      async createCustomer(req: Request, res: Response){
        try {
          const data = await this.customerService.createCustomer(req.body);
          return res.status(201).json(data);
        } catch (error) {
            console.log(error);
        }
      }


      async updateCustomer(req: Request, res: Response){
        const {id} = req.params;
        try {
          const data = await this.customerService.updateCustomer(id, req.body);
          return res.status(200).json(data);
        } catch (error) {
            console.log(error);
        }
      }


      async deleteCustomer(req: Request, res: Response){
        const {id} = req.params;
        try {
          const data = await this.customerService.deleteCustomer(id);
          return res.status(200).json(data);
        } catch (error) {
            console.log(error);
        }
      }
}