import * as dotenv from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export abstract class ConfigServer{
    constructor(){
        const nodeNameEnv = this.createPathEnv(this.nodeEnv)
        dotenv.config({
            path: nodeNameEnv,
        })
    }

    public getEnvaironment(k: string): string | undefined{
        return process.env[k];
    }

    public getNumberEnv(k: string): number{
        return Number(this.getEnvaironment(k));
    }

    public get nodeEnv(): string{
        return this.getEnvaironment("NODE_ENV")?.trim() || "";
    }

    public createPathEnv(path : string): string{
        const arrEnv: string[] = ["env"];
        if(path.length > 0){
            const stringToArray: string[] = path.split('.');
            arrEnv.unshift(...stringToArray);
        }
        return'.' + arrEnv.join('.');
    }

    public get typeORMConfig(): DataSourceOptions{
        return{
            type: 'mysql',
            host: this.getEnvaironment('DB_HOST'),
            port: this.getNumberEnv('DB_PORT'),
            username: this.getEnvaironment('DB_USER'),
            password: this.getEnvaironment('DB_PASSWORD'),
            database: this.getEnvaironment('DB_DATABASE'),
            entities: [__dirname + "/../**/*.entity{.ts,.js}"],
            migrations: [__dirname + "/../../migrations/*{.ts,.js}"],
            synchronize: false,
            migrationsRun: false,
            logging: false,
            namingStrategy: new SnakeNamingStrategy()
    }
}

async dbConnect(): Promise<DataSource>{
    return await new DataSource(this.typeORMConfig).initialize();
}

}