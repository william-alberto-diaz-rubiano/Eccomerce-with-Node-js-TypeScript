import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { UserDto } from "../dto/user.dto";
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

    async createUser(body: UserDto): Promise<UserEntity>{
        return await (await this.exeRepository).save(body);
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

}