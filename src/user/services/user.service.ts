import { DeleteResult, UpdateResult } from "typeorm";
import * as bcrypt from "bcrypt";
import { BaseService } from "../../config/base.service";
import { RoleType, UserDto } from "../dto/user.dto";
import { UserEntity } from "../entities/user.entity";

export class UserService extends BaseService<UserEntity> {

    constructor(){
        super(UserEntity);
    }

    async findAllUser(): Promise<UserEntity[]>{
        return (await this.exeRepository).find();
    }

    async findUserById(id: string): Promise<UserEntity | null> {
        return (await this.exeRepository).findOneBy({ id });
      }

    async findUserByEmail(email: string): Promise<UserEntity | null> {
      return (await this.exeRepository)
      .createQueryBuilder("user")
      .addSelect("user.password")
      .where({email})
      .getOne();
    }

    async findUserByUserName(userName: string): Promise<UserEntity | null> {
      return (await this.exeRepository)
      .createQueryBuilder("user")
      .addSelect("user.password")
      .where({userName})
      .getOne();
    }

    async createUser(body: UserDto): Promise<UserEntity>{
      
      const newUser = (await this.exeRepository).create(body);
      const hash = await bcrypt.hash(newUser.password, 10);
      newUser.password = hash;
        return await (await this.exeRepository).save(newUser);
    }
    
    async deleteUser(id: string): Promise<DeleteResult> {
        return (await this.exeRepository).delete({ id });
      }
      async updateUser(id: string, infoUpdate: UserDto): Promise<UpdateResult> {
        return (await this.exeRepository).update(id, infoUpdate);
      }

      async findUserWithRelation(id: string): Promise<UserEntity | null> {
        return (await this.exeRepository)
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.customer','customer')
        .where({id})
        .getOne();
      }

      async findUserWithRole(
        id: string,
        role: RoleType
      ): Promise<UserEntity | null> {
        const user = (await this.exeRepository)
          .createQueryBuilder("user")
          .where({ id })
          .andWhere({ role })
          .getOne();
    
        return user;
      }

}