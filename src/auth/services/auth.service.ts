import { ConfigServer } from "../../config/config";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { UserService } from "../../user/services/user.service";
import { UserEntity } from "../../user/entities/user.entity";
import { PayloadToken } from "../interfaces/auth.interface";

export class AuthService extends ConfigServer{

    constructor(private readonly userService: UserService = new UserService(),
    private readonly jwtInstance = jwt
    ){
        super();
    }

    public async validateUser(userName: string, password: string): Promise<UserEntity | null> {

        const userByEmail = await this.userService.findUserByEmail(userName);
        const userByUserName = await this.userService.findUserByUserName(userName)

        if(userByUserName){
            const isMatch = await bcrypt.compare(password, userByUserName.password);
            isMatch && userByUserName;
        }

        if(userByEmail){
            const isMatch = await bcrypt.compare(password, userByEmail.password);
            isMatch && userByEmail;
        }

        return null;
    }

    sing(payload: jwt.JwtPayload, secret: any){
        return this.jwtInstance.sign(payload, secret);
    }

    public async generateJWT(user: UserEntity): Promise<{accessToken: string; user: UserEntity}>{
        const userConsult = await this.userService.findUserWithRole(user.id, user.role);

        const payload: PayloadToken = {
            role: userConsult!.role,
            sub: userConsult!.id,
        }

        if(userConsult){
            user.password = "Not permission";
        }
        
        return {
            accessToken: this.sing(payload, this.getEnvaironment("JWT_SECRET")),
            user,
        };
    }

}