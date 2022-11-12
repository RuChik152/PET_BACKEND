import express from "express";
import {ModelCreateCategoryProduct, ModelCreateGroupProduct, ModelCreateProduct} from "./model";

interface Product {
    name: string;
    description: string;
    price: string;
    count: number;
    madeCountry:string;
    discount:number;
}

export const routeProduct = express.Router();

routeProduct.get('/group/v1', async (req, res) => {
    try {
        const groups = await ModelCreateGroupProduct.find({}, {id: 1, name: 1, description: 1});
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).json({status: false, ERROR: null, massage: "group founds", data: groups});
    } catch (error) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(500).json({status: false, ERROR: true, massage: error});
    }
});

routeProduct.get('/group/v1/:id', async (req, res) => {
    try {
        const groups = await ModelCreateGroupProduct.findOne({ _id: req.params.id }, {id: 1, name: 1, description: 1});
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).json({status: false, ERROR: null, massage: "group founds", data: groups});

    } catch (error) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(500).json({status: false, ERROR: true, massage: error});
    }
});

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
        const group = await ModelCreateGroupProduct.findOneAndUpdate({ _id: req.body._id}, req.body.data);
        const newGroup = await ModelCreateGroupProduct.findOne({ _id: req.body._id});
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
});


routeProduct.get('/categodry/v1', async (req, res) => {
    try {
        const category = await ModelCreateCategoryProduct.find({}, {id: 1, name: 1, description: 1});
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).json({status: false, ERROR: null, massage: "category founds", data: category});

    } catch (error) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(500).json({status: false, ERROR: true, massage: error});
    }
});

routeProduct.get('/categodry/v1/:id', async (req, res) => {
    try {
        const category = await ModelCreateCategoryProduct.findOne({ _id: req.params.id }, {id: 1, name: 1, description: 1});
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).json({status: false, ERROR: null, massage: "category founds", data: category});

    } catch (error) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(500).json({status: false, ERROR: true, massage: error});
    }
});

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
        const category = await ModelCreateCategoryProduct.findOneAndUpdate({ _id: req.body._id}, req.body.data );
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

routeProduct.put('/update/product/v1', async (req, res) => {
    try {
        const product = await ModelCreateProduct.findOneAndUpdate({ _id: req.body._id}, req.body.data );
        const newProduct = await ModelCreateProduct.findOne({ _id: req.body._id});
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).json({status: true, ERROR: null, massage: "product update", data: newProduct});
    } catch (error) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(500).json({status: false, ERROR: true, massage: error});
    }
});

routeProduct.delete('/delete/product/v1/:id', async (req, res) => {
    try {
         ModelCreateProduct.findOneAndDelete({_id: req.params.id},{},(err, doc) => {
           if(err){
               res.setHeader('Access-Control-Allow-Origin', '*');
               res.status(401).json({status: false, ERROR: true, massage: 'Deleted not success', data: err});
           } else {
               res.setHeader('Access-Control-Allow-Origin', '*');
               res.status(401).json({status: true, ERROR: false, massage: 'Deleted success', data: doc});
           }
        })
    } catch (error) {
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
});

routeProduct.get('/:id', async (req, res) => {
    try {
        //const test = await ModelCreateProduct.findOne({_id: req.params.id}, { name:1, count:1, _id: 1, group:1, category:1 }).populate('group', {name:1}).populate('category', {name:1});
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
});

