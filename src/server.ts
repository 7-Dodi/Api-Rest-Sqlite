import express from 'express';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors());

//Importando rotas
import {userRouter} from './routes/userRouter';
import {userRouter as technologiesRouter} from './routes/technologiesRouter';

app.use('/users', userRouter); //Rotas da usuário
app.use('/technologies', technologiesRouter); //Rotas de technologies

app.listen(5000, () => {
    console.log("Servidor funcionando na porta 5000");
})