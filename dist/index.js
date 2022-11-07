"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const config_server_1 = require("./system/config.server");
const midelware_1 = require("./midelware");
const authorisation_1 = require("./authorisation");
const product_1 = require("./product");
dotenv_1.default.config();
const app = (0, express_1.default)();
(0, config_server_1.connect_db)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
const server = app.listen(config_server_1.srv_params.PORT, () => {
    console.log('SERVER_LOGS => ', config_server_1.srv_params.DESCRIPTION);
});
//Главная миделвара, через которую будут проходить все запросы, внутри пока для теста есть добавление\изменения данных в body
app.use(midelware_1.mainMiddleWare);
app.use('/auth', authorisation_1.route);
app.use('/product', product_1.routeProduct);
//Тестовый эдпоинт
app.get("/test", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('test_REQ', req.body);
    res.status(200).json(req.body);
}));
