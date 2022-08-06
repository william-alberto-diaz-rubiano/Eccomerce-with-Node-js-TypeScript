import { BaseRouter } from "../shared/router/router"
import { PurchaseController } from "./controllers/purchase.controller";

export class PurchaseRouter extends BaseRouter<PurchaseController>{

    constructor(){
        super(PurchaseController)
    }

    routes(): void {
        this.router.get("/purchases", (req, res)=> this.controller.getPurchases(req, res));
        this.router.get("/purchases/:id", (req, res)=> this.controller.getPurchaseById(req, res));
        this.router.post("/purchases", (req, res)=> this.controller.createPurchase(req, res));
        this.router.put("/purchases/:id", (req, res)=> this.controller.updatePurchase(req, res));
        this.router.delete("/purchases/:id", (req, res)=> this.controller.deletePurchase(req, res));
    }

}