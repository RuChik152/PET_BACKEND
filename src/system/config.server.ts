import express from "express";
import dotenv from "dotenv";


const app = express();

app.set('port', (process.env.PORT || 4000));

export const srv_params = {
    PORT: app.get("port"),
    DESCRIPTION: `<<Server Start>> ${new Date()} http://localhost:${app.get('port')}`
}

