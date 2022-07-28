import { Exclude } from "class-transformer";
import { Column, Entity, OneToOne } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { CustomerEntity } from "../../customer/entities/customer.entity";

@Entity({name: "user", database: "tienda_db"})
export class UserEntity extends BaseEntity{

    @Column()
    name!: string;
  
    @Column()
    lastName!: string;
  
    @Column()
    userName!: string;
  
    @Column()
    email!: string;
  
    @Exclude()
    @Column()
    password!: string;
  
    @Column()
    city!: string;
  
    @Column()
    state!: string;

    @OneToOne(()=>CustomerEntity, (customer)=> customer.user)
    customer!: CustomerEntity;
}