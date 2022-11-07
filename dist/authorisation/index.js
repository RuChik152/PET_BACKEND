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
exports.route = void 0;
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const mockData = {
    email: 'test@test.test',
    password: '1234567890',
    userName: 'GREEN_FOX',
    firstName: 'IVAN',
    secondNAme: 'PETROV',
    phoneNamber: '999887766'
};
exports.route = express_1.default.Router();
exports.route.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //***...тут должна быть реализация записи в БД
        const hashPassword = yield bcrypt_1.default.hash(mockData.password, 10);
        console.log('hashPassword => ', hashPassword);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).json({});
    }
    catch (error) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(500).json({ ERROR: true, detailError: error });
    }
}));
exports.route.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hashPassword = yield bcrypt_1.default.hash(mockData.password, 10);
    console.log('hashPassword => ', hashPassword);
    const comparePassword = yield bcrypt_1.default.compare(req.body.password, hashPassword);
    if (comparePassword) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).json({ accessToken: '1234567890qwertyuiop', refreshToken: 'qwertyuiop1234567890' });
    }
    else {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(401).json({ status: comparePassword });
    }
}));
exports.route.post('token', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
}));
