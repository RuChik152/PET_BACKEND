import mongoose, { Schema, model } from 'mongoose';
import bcrypt from "bcrypt";

const UsersRegSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        default: 'NoName_firstName'
    },
    secondName: {
        type: String,
        default: 'NoName_secondName'
    },
    age:{
        type: Number,
        default: 0
    }
},
    {
        timestamps: true
    })

UsersRegSchema.pre('save', async function (next) {
    const hashPassword = await bcrypt.hash(this.password, 10);
    this.password = hashPassword;
    next();
})

export const UserRegModel = model('UserRegModel', UsersRegSchema, 'users');