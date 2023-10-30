import { prisma } from "../user/repositoryUser";
import { Request, Response, NextFunction } from "express";

// Define uma nova interface que representa a sua definição personalizada da requisição (Request)
const checkUserName = async (useName: unknown) =>{
    const searchUser = (await prisma.user.findMany()).some((item)=> item.userName === useName); 
    return searchUser;
}; 

export function checkExistsUserAccount (req: Request, res:Response, next:NextFunction){
    // Obtém o username do cabeçalho da requisição
    const username = req.headers.username as string;
    if(!username || !checkUserName(username)){
        res.status(400).json({"error":"This UserName does not exist"});
        return; 
    }

    // Armazena o username dentro de req.user
    req.user = { userName: username };

    next();
};

