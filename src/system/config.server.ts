import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";


const app = express();

app.set('port', (process.env.PORT || 4000));

export const srv_params = {
    PORT: app.get("port"),
    DESCRIPTION: `<<Server Start>> ${new Date()} http://localhost:${app.get('port')}`
}

export const connect_db = () => mongoose.connect(`${process.env.DB_CONNECT_TYPE}://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_SERVER}/${process.env.DB_NAME}`)
    .then((data) => {
        console.log(`SERVER_LOGS => DataBase Connect Success`);
        return data;
    })
    .catch((error) => console.log('SERVER_LOGS => DataBase NOT Connect  ', `ERROR: ${error}`))


