"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainMiddleWare = void 0;
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const mainMiddleWare = (req, res, next) => {
    //console.log('test_midaelware_1', req.body);
    //req.body.test_1 = 1
    //console.log('test_midaelware_2', req.body);
    //req.body.test_2 = 2
    next();
};
exports.mainMiddleWare = mainMiddleWare;
