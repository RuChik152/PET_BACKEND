"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect_db = exports.srv_params = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
app.set('port', (process.env.PORT || 4000));
exports.srv_params = {
    PORT: app.get("port"),
    DESCRIPTION: `<<Server Start>> ${new Date()} http://localhost:${app.get('port')}`
};
const connect_db = () => mongoose_1.default.connect(`${process.env.DB_CONNECT_TYPE}://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_SERVER}/${process.env.DB_NAME}`)
    .then((data) => {
    console.log(`SERVER_LOGS => DataBase Connect Success`);
    return data;
})
    .catch((error) => console.log('SERVER_LOGS => DataBase NOT Connect  ', `ERROR: ${error}`));
exports.connect_db = connect_db;
