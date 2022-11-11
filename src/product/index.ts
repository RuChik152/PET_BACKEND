import express from "express";
import {ModelCreateCategoryProduct, ModelCreateGroupProduct, ModelCreateProduct} from "./model";

export const routeProduct = express.Router();

routeProduct.post('/create/group/v1', async (req, res) => {
    try {
        const  check = await ModelCreateGroupProduct.findOne({name: req.body.name});
        if(!check) {
            const create = await ModelCreateGroupProduct.create(req.body)
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.status(200).json({status: true, ERROR: null, massage: "group created", data: create});
        } else {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.status(200).json({status: false, ERROR: null, massage: "group already exists"});
        }
    }catch (error){
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(500).json({status: false, ERROR: true, massage: error});
    }
});

interface Product {
    name: string;
    description: string;
    price: string;
    count: number;
    madeCountry:string;
    discount:number;
}

routeProduct.post('/create/categodry/v1', async (req, res) => {
    try {
        const  check = await ModelCreateCategoryProduct.findOne({name: req.body.name});
        if(!check) {
            const create = await ModelCreateCategoryProduct.create(req.body)
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.status(200).json({status: true, ERROR: null, massage: "group created", data: create});
        } else {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.status(200).json({status: false, ERROR: null, massage: "category already exists"});
        }
    }catch (error){
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(500).json({status: false, ERROR: true, massage: error});
    }
});


routeProduct.post('/create/product/v1', async (req, res) => {
    try {
        const  check = await ModelCreateProduct.findOne({name: req.body.name});
        if(!check) {
            const create = await ModelCreateProduct.create(req.body)
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.status(200).json({status: true, ERROR: null, massage: "group created", data: create});
        } else {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.status(200).json({status: false, ERROR: null, massage: "product already exists"});
        }
    }catch (error){
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(500).json({status: false, ERROR: true, massage: error});
    }
});

routeProduct.get('/all', async (req, res) => {
    try {
        const products = await ModelCreateProduct.find().populate('group').populate('category');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).json({status: true, ERROR: null, massage: "product found", data: products});
    } catch (error) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(500).json({status: false, ERROR: true, massage: error});
    }
})

routeProduct.get('/:id', async (req, res) => {
    try {
        // @ts-ignore
        const { _id, name, description, price, count, discount, group, category } = await ModelCreateProduct.findOne({_id: req.params.id}).populate('group').populate('category');
        const product = {
            _id,
            name,
            description,
            price,
            count,
            discount,
            group: {
                _id: group._id,
                name: group.name,
            },
            category: {
                _id: category._id,
                name: category.name,
            }
        }
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).json({status: true, ERROR: null, massage: "product found", data: product});
    } catch (error) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(500).json({status: false, ERROR: true, massage: error});
    }
})