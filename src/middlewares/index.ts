// errorMiddleware.ts
import { Request, Response, NextFunction } from "express";

class AppError extends Error {
    public statusCode: number;
    public isOperational: boolean;

    constructor(message: string, statusCode: number, isOperational: boolean = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this, this.constructor);
    }
}

export const errorHandler = (err: Error | AppError, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: "error",
            message: err.message,
            ...(process.env.NODE_ENV !== "production" && { stack: err.stack })
        });
    }
    console.error('Unexpected Error:', err);
    return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
        ...(process.env.NODE_ENV !== "production" && { stack: err.stack })
    });
};


export const catchAsync = (fn: Function) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};