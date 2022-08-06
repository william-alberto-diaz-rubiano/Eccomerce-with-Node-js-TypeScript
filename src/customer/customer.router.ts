import { BaseRouter } from "../shared/router/router";
import { CustomerController } from "./controllers/customer.controller";

export class CustomerRouter extends BaseRouter<CustomerController>{

    constructor(){
        super(CustomerController)
    }

    routes(): void {
        this.router.get("/customers", (req, res)=> this.controller.getCustomers(req, res));
        this.router.get("/customers/:id", (req, res)=> this.controller.getCustomerById(req, res));
        this.router.get("/customers/user/:id", (req, res)=> this.controller.getCustomerWithUser(req, res));
        this.router.get("/customers/:id/purchases", (req, res)=> this.controller.getCustomerWithPurchases(req, res));
        this.router.post("/customers", (req, res)=> this.controller.createCustomer(req, res));
        this.router.put("/customers/:id", (req, res)=> this.controller.updateCustomer(req, res));
        this.router.delete("/customers/:id", (req, res)=> this.controller.deleteCustomer(req, res));
    }
}