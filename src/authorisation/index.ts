import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const mockData = {
    email: 'test@test.test',
    password: '1234567890',
    userName: 'GREEN_FOX',
    firstName: 'IVAN',
    secondNAme: 'PETROV',
    phoneNamber: '999887766'
}



export const route = express.Router();

route.post('/signup', async (req, res) => {
    try {
        //***...тут должна быть реализация записи в БД

        const hashPassword = await bcrypt.hash(mockData.password, 10);
        console.log('hashPassword => ', hashPassword)
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).json({});
    }catch (error){
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(500).json({ ERROR: true, detailError: error });
    }


})

route.post('/signin', async (req, res) => {

    const hashPassword = await bcrypt.hash(mockData.password, 10);
    console.log('hashPassword => ', hashPassword)
    const comparePassword = await bcrypt.compare(req.body.password, hashPassword)

    if(comparePassword) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).json({accessToken: '1234567890qwertyuiop', refreshToken: 'qwertyuiop1234567890'});
    }else {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(401).json({status: comparePassword});
    }
})

route.post('token', async (req, res) => {

})