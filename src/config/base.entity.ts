import { CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

export class BaseEntity{

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @CreateDateColumn(
        {
            name: "created_at",
            type: "timestamp",
        }
    )
    createdAd!: Date;

    @CreateDateColumn(
        {
            name: "updated_at",
            type: "timestamp",
        }
    )
    updateAd!: Date;
}


