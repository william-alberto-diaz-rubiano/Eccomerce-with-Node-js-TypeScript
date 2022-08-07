import { Exclude } from "class-transformer";
import { Column, Entity, OneToOne } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { CustomerEntity } from "../../customer/entities/customer.entity";
import { RoleType } from "../dto/user.dto";

@Entity({name: "user", database: "tienda_db"})
export class UserEntity extends BaseEntity{

    @Column()
    name!: string;
  
    @Column()
    lastname!: string;
  
    @Column()
    username!: string;
  
    @Column()
    email!: string;
  
    @Exclude()
    @Column()
    password!: string;
  
    @Column()
    city!: string;
  
    @Column()
    state!: string;

    @Column({type: "enum", enum: RoleType, nullable: false})
    role!: RoleType;

    @OneToOne(()=>CustomerEntity, (customer)=> customer.user)
    customer!: CustomerEntity;
}