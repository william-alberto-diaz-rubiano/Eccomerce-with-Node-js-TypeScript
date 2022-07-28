import express from "express";
import morgan from "morgan";
import cors from "cors";
import { ConfigServer } from "./config/config";
import { UserRouter } from "./user/user.router";
import { CategoryRouter } from "./category/category.router";
import { CustomerRouter } from "./customer/customer.router";
import { ProductRouter } from "./product/product.route";

class ServerBootstrap extends ConfigServer{
    public app: express.Application = express();
    private port: number =  this.getNumberEnv('PORT');

    constructor(){
        super();
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: true}))
        this.dbConnect();
        this.app.use(morgan("dev"))
        this.app.use(cors());

        this.app.use("/api", this.routers())
        this.listen();
    }

    routers(): Array<express.Router>{
        return [new UserRouter().router, new CategoryRouter().router, new CustomerRouter().router, new ProductRouter().router];
    }

    

    public listen() {
        this.app.listen(this.port, () => {
            console.log("server listening on port " + this.port);
        })
    } 
}

new ServerBootstrap();