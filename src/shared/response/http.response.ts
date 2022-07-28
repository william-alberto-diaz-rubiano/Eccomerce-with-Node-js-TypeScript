import { Response } from "express";

export enum HttpStatus {

    OK = 200,
    CREATED = 201,
    NOT_FOUND = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    WARN = 400,
    INTERNAL_SERVER_ERROR = 500,
    FATAL = 502,
    UNKNOWN = 503,
}

export class HttpResponse {

    Ok(res: Response, data: any): Response{
        return res.status(HttpStatus.OK).json({
            Status: HttpStatus.OK,
            Message: "Success",
            Data: data
        });
    }

    Created(res: Response, data: any): Response{
        return res.status(HttpStatus.CREATED).json({
            Status: HttpStatus.CREATED,
            Message: "Created",
            Data: data
        });
    }

    NotFound(res: Response, data: any): Response{
        return res.status(HttpStatus.NOT_FOUND).json({
            Status: HttpStatus.NOT_FOUND,
            Message: "NotFound",
            Error: data
        });
    }

    Unauthorized(res: Response, data: any): Response{
        return res.status(HttpStatus.UNAUTHORIZED).json({
            Status: HttpStatus.UNAUTHORIZED,
            Message: "Unauthorized",
            Error: data
        });
    }

    Forbidden(res: Response, data: any): Response{
        return res.status(HttpStatus.FORBIDDEN).json({
            Status: HttpStatus.FORBIDDEN,
            Message: "Forbidden",
            Error: data
        });
    }

    Error(res: Response, data: any): Response{
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            Status: HttpStatus.INTERNAL_SERVER_ERROR,
            Message: "Internal server error",
            Error: data
        });
    }
}
