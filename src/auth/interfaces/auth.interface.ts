import { RoleType } from "../../user/dto/user.dto";

export interface PayloadToken{
    role: RoleType,
    id: string;
}