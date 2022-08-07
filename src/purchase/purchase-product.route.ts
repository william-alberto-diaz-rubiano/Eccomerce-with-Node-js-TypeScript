import { BaseRouter } from "../shared/router/router"
import { PurchaseProductController } from "./controllers/purchase-product.controller";
import { PurchaseProductMiddleware } from "./middlewares/purchase-product.midleware";

export class PurchaseProductRouter extends BaseRouter<PurchaseProductController, PurchaseProductMiddleware>{

    constructor(){
        super(PurchaseProductController, PurchaseProductMiddleware)
    }

    routes(): void {
        this.router.get("/purchase-products", (req, res)=> this.controller.getPurchaseProducts(req, res));
        this.router.get("/purchase-products/:id", (req, res)=> this.controller.getPurchaseProductById(req, res));
        this.router.get("/purchase-products/extrainfo/:id", (req, res)=> this.controller.getPurchaseProductWithExtraInfo(req, res));
        this.router.post("/purchase-products",
        (req, res, next)=> [this.middleware.purchaseProductValidator(req, res, next)],
        (req, res)=> this.controller.createPurchaseProduct(req, res));

        this.router.put("/purchase-products/:id", (req, res)=> this.controller.updatePurchaseProduct(req, res));
        this.router.delete("/purchase-products/:id", (req, res)=> this.controller.deletePurchaseProduct(req, res));
    }

}