import { db } from "./config/database";
import Express from 'express';
import usuarioRouter from "./routes/usuarioRoute";
import bodyParser from 'body-parser';
import receitaRouter from "./routes/receitaRoute";

const app = Express()

app.use(Express.json());
app.use(bodyParser.json());

app.use('/',usuarioRouter)
app.use('/',receitaRouter) 

db.initialize().then(async () => {
    console.log('Conectado ao Banco');
    app.listen(5000, () => {
        console.log('Server started on port 5000');
    })
}) 