import { Request, Response } from "express";
import { JWT_SECRET } from "../constants/user";
import jwt from "jsonwebtoken";
import { UserAttributes } from "../models/user";

export const authenticateToken = (req: Request, res: Response, next: Function) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) {
        res.sendStatus(401);
        return;
    }

    jwt.verify(token, JWT_SECRET, (err) => {
        if (err) return res.sendStatus(403)
        next()
    })
}