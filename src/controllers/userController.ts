import { prisma } from '../user/repositoryUser';
import brcyptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';

//Métodos de usuário
const listUser = async (req: Request, res:Response) => {
    res.status(200).json(await prisma.user.findMany()); //Irá retornar todos os usuários
};

const addUser = async (req: Request, res:Response) => {
    const { name, username, password, latitude, longitude } = req.body;
    const userNameExist = (await prisma.user.findMany()).some((item) => item.userName === username);

    //Validations
    if(!name){
        res.status(404).json({"error": "The name is mandatory"});
    }
    if(!username){
        res.status(404).json({"error": "The userName is mandatory"});
    }
    if(!password){
        res.status(404).json({"error": "The password is mandatory"});
    }
    if(!latitude){
        res.status(404).json({"error": "The latitude is mandatory"});
    }
    if(!longitude){
        res.status(404).json({"error": "The longitude is mandatory"});
    }

    //Confirmando se o userName já existe ou não:
    if (userNameExist) {
        res.status(404).json({ "error": "Existing UserName" });
    } else {

        //Criando password
        const salt = await brcyptjs.genSalt(12);
        const hashPassword = await brcyptjs.hash(password, salt); 

        //Criando User:
        const newUser = await prisma.user.create({
            data: {
                id: uuidv4(),
                name: name,
                userName: username,
                password: hashPassword,
                latitude: latitude,
                longitude: longitude
            }
        });

        //Atualizando o dataBase:
        res.status(201).json(newUser);
    }
};

//Método para criar token a um usuário
const authenticationUser = async (req: Request, res: Response) =>{
    const {username, password} = req.body;
    
    //Validations
    if(!username){
        res.status(404).json({"error": "The userName is mandatory"});
    }
    if(!password){
        res.status(404).json({"error": "The password is mandatory"});
    }

    //Procurando usuário
    const userNameExist = await prisma.user.findUnique({
        where:{
            userName: username
        }
    })

    //Caso não encontre o usuário
    if(!userNameExist){
        res.status(404).json({ "error": "UserName does not exist" });
    }else{
        //Conferindo a senha 
        const checkPassword = await brcyptjs.compare(password, userNameExist?.password);
        
        if(!checkPassword){
            return res.status(422).json({"msg": 'Invalid password'}); 
        }

        try {
            const secret = process.env.SECRET; //Segredo de token

            //Prevenindo que o segredo não seja vazio
            if(!secret){
                throw new Error('JWT secret is not defined');
            }

            //Criando token
            const token = jwt.sign(
                {
                    id: userNameExist?.id,
                },
                secret
            );

            res.status(200).json({"msg": 'Authentication successful', token})
        } catch (error) {
            console.log(error)
            res.status(500).json({"msg":'Server error, try again later'});
        }
    }
};

export{listUser, addUser, authenticationUser};