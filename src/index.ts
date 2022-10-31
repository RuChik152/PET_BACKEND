import express from "express";
import cors from "cors"
import path from "path"
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import {srv_params} from "./system/config.server";
import {mainMiddleWare} from "./midelware";
import {route} from "./authorisation";


dotenv.config()
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));


const server = app.listen(srv_params.PORT, () => {
    console.log('SERVER_LOGS => ', srv_params.DESCRIPTION);
})


//Главная миделвара, через которую будут проходить все запросы, внутри пока для теста есть добавление\изменения данных в body
app.use(mainMiddleWare);

app.use('/auth', route);

//Тестовый эдпоинт
app.get("/test", async (req, res) => {
    console.log('test_REQ', req.body);
    res.status(200).json(req.body);
})

