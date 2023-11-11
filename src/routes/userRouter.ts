const express = require('express');
const userRouter = express.Router();
import checkToken from '../middleware/checkToken';
import {listUser, addUser, authenticationUser} from '../controllers/userController';

//Métodos do usuário:
userRouter.get('/', checkToken, listUser);
userRouter.post('/', addUser);
userRouter.post('/authentication', authenticationUser);

export {userRouter};