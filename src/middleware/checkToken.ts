import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export default function checkToken (req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token){
        return res.status(401).send({"erro":"Restricted access"});
    }

    try {
        const secret = process.env.SECRET;
        if(!secret){
            throw new Error('JWT secret is not defined');
        }
        
        jwt.verify(token, secret);
        next();
    } catch (error) {
        console.log(error);
        res.status(400).send({"msg": "Invalid token"});
    }
}