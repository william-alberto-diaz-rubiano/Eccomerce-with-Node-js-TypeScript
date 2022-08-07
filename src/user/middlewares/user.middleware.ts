import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../../shared/response/http.response";
import { UserDto } from "../dto/user.dto";

export class UserMiddleware{

    constructor(private readonly httpResponse: HttpResponse = new HttpResponse()){}
    
    userValidator(req: Request, res: Response, next: NextFunction ){
        const {
            name,
            lastname,
            username,
            email,
            password,
            city,
            state,
            role
        } = req.body; 

        const valid = new UserDto();

        valid.name = name;
        valid.lastname = lastname;
        valid.username = username;
        valid.email = email;
        valid.password = password;
        valid.city = city;
        valid.state = state;
        valid.role = role;

        validate(valid).then((err) => {
            if(err.length > 0) {
                return this.httpResponse.Error(res, err);
            }else{
                next();
            }
        })
    }
}