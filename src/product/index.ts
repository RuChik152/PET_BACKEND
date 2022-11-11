import express from "express";
import {ModelCreateCategoryProduct, ModelCreateGroupProduct, ModelCreateProduct} from "./model";
import * as Module from "module";

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

routeProduct.put('/update/group/v1', async (req, res) => {
    try {
        const group = await ModelCreateGroupProduct.findOneAndUpdate({ _id: req.body._id}, { name: req.body.description });
        const newGroup = await ModelCreateProduct.findOne({ _id: req.body._id});
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).json({status: true, ERROR: null, massage: "group update", data: newGroup});
    } catch (error) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(500).json({status: false, ERROR: true, massage: error});
    }
});

routeProduct.delete('/delete/group/v1/:id', async (req, res) => {
    try {
        const search = await ModelCreateProduct.find({ group: req.params.id });
        if(search.length === 0){
            const  group = await ModelCreateGroupProduct.findOneAndDelete({_id: req.params.id});
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.status(200).json({status: true, ERROR: null, massage: 'group deleted'});
        } else {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.status(200).json({status: false, ERROR: null, massage: 'group not deleted, dependent products exist'});
        }
    } catch (error) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(500).json({status: false, ERROR: true, massage: error});
    }
})

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

routeProduct.put('/update/categodry/v1', async (req, res) => {
    try {
        const category = await ModelCreateCategoryProduct.findOneAndUpdate({ _id: req.body._id}, { name: req.body.name });
        const newCategory = await ModelCreateCategoryProduct.findOne({ _id: req.body._id});
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).json({status: true, ERROR: null, massage: "category update", data: newCategory});
    } catch (error) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(500).json({status: false, ERROR: true, massage: error});
    }
});

routeProduct.delete('/delete/categodry/v1/:id', async (req, res) => {
    try {
        const search = await ModelCreateProduct.find({ category: req.params.id });
        if(search.length === 0){
            const  category = await ModelCreateCategoryProduct.findOneAndDelete({_id: req.params.id});
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.status(200).json({status: true, ERROR: null, massage: 'category deleted', data: category});
        } else {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.status(200).json({status: false, ERROR: null, massage: 'category not deleted, dependent products exist', data: search});
        }
    } catch (error) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(500).json({status: false, ERROR: true, massage: error});
    }
})

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

