import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { SharedMiddleware } from "../../shared/middlewares/shared.middleware";
import { HttpResponse } from "../../shared/response/http.response";
import { UserDto } from "../dto/user.dto";

export class UserMiddleware extends SharedMiddleware{

    constructor(){
        super();
    }
    
    userValidator(req: Request, res: Response, next: NextFunction ){
        const {
            name,
            lastName,
            userName,
            email,
            password,
            city,
            state,
            role
        } = req.body; 

        const valid = new UserDto();

        valid.name = name;
        valid.lastName = lastName;
        valid.userName = userName;
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