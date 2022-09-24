import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { RoleType } from "../../user/dto/user.dto";
import { UserEntity } from "../../user/entities/user.entity";
import { HttpResponse } from "../response/http.response";

export class SharedMiddleware {
  constructor(public httpResponse: HttpResponse = new HttpResponse()) {}
  passAuth(type: string) {
    return passport.authenticate(type, { session: false });
  }

  checkUserRole(req: Request, res: Response, next: NextFunction) {
    const user = req.user as UserEntity;
    const {id} = req.params;
    console.log(user.id)
    console.log(id)
    if (user.role !== RoleType.USER || user.id !== id) {
      return this.httpResponse.Unauthorized(res, "No tienes permiso");
    }
    return next();
  }

  checkCustomerRole(req: Request, res: Response, next: NextFunction) {
    const user = req.user as UserEntity;
    if (user.role !== RoleType.CUSTOMER) {
      return this.httpResponse.Unauthorized(res, "No tienes permiso");
    }
    return next();
  }

  checkAdminRole(req: Request, res: Response, next: NextFunction) {
    const user = req.user as UserEntity;
    if (user.role !== RoleType.ADMIN) {
      return this.httpResponse.Unauthorized(res, "No tienes permiso");
    }
    return next();
  }
}
