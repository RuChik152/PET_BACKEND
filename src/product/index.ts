import express from "express";
import {ModelCreateCategoryProduct, ModelCreateGroupProduct} from "./model";

export const routeProduct = express.Router();

routeProduct.post('/create/group', async (req, res) => {
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

routeProduct.post('/create/category', async (req, res) => {
    try {
        const name = req.body.category.name

        //TODO TypeScript
        const checkGroup: any = await ModelCreateCategoryProduct.findById(req.body._id);

        // console.log('checkGroup.categoryList', checkGroup.categoryList === undefined);
        const check = checkGroup.categoryList === undefined;

        if(check){
          const create = await ModelCreateGroupProduct.findOneAndUpdate({_id: req.body._id}, { $push: { categoryList: req.body.category }},(err: any, data:any) => {
                if(err){
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.status(200).json({status: false, ERROR: null, massage: "category not created", err});
                }else {
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.status(200).json({status: true, ERROR: null, massage: "category add 1", data});
                }
          })
        }

        // if(check) {
        //     await ModelCreateGroupProduct.findOneAndUpdate({_id: req.body._id}, { $push: { categoryList: req.body.category }}, (err: any, data: any) => {
        //         if(err){
        //             res.setHeader('Access-Control-Allow-Origin', '*');
        //             res.status(200).json({status: false, ERROR: null, massage: "category not created", err});
        //         }else {
        //             res.status(200).json({status: true, ERROR: null, massage: "category add 1", data});
        //         }
        //     })
        // } else {
        //     const checkList = await checkGroup.categoryList.find((item: Product) => item.name == name);
        //     console.log('checkList', checkList);
        //     if(!checkList) {
        //         const create = await ModelCreateGroupProduct.findByIdAndUpdate(req.body._id, {$push: { categoryList: req.body.category }}, (err: any, data: any) => {
        //             res.setHeader('Access-Control-Allow-Origin', '*');
        //             res.status(200).json({status: true, ERROR: null, massage: "category add 2"});
        //         })
        //     }else {
        //         res.setHeader('Access-Control-Allow-Origin', '*');
        //         res.status(200).json({status: false, ERROR: null, massage: "category already exists"});
        //     }
        // }
    }catch (error) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(500).json({status: false, ERROR: true, massage: error, test: 'test' });
    }
});

routeProduct.post('/create/categodry/v1',   async (req, res) => {

        // @ts-ignore
        const test = await ModelCreateGroupProduct.findById(req.body._id)
        await console.log('test', test);
        // @ts-ignore
        const test2 = await test.categoryList;
        await console.log('test2', test2);
        function check (){
            return test2 === undefined;
        }
        //const check = await () => categoryList === undefined;
        await console.log('check', check());
        await console.log('length', test2.length);

        if(test2.length === 0){
            ModelCreateGroupProduct.findOneAndUpdate({_id: req.body._id}, { $push: { categoryList: req.body.category }}, (err: any, data: any) => {
                if(err){
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.status(200).json({status: false, ERROR: true, massage: "category not created", err});
                }else {
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.status(200).json({status: true, ERROR: false, massage: "category created", data});
                }
            });
        }else if (test2.length !== 0){
            const check_2 = await test2.findIndex((item) => item.name == req.body.category.name);
            await console.log('check_2', check_2);
            if(check_2 === -1){
                ModelCreateGroupProduct.findOneAndUpdate({_id: req.body._id}, { $push: { categoryList: req.body.category }}, (err: any, data: any) => {
                    if(err){
                        res.setHeader('Access-Control-Allow-Origin', '*');
                        res.status(200).json({status: false, ERROR: true, massage: "category not created", err});
                    }else {
                        res.setHeader('Access-Control-Allow-Origin', '*');
                        res.status(200).json({status: true, ERROR: false, massage: "category created", data});
                    }
                });
            }else {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.status(500).json({status: false, ERROR: true, massage: 'Такая категория уже есть'});
            }
        }

        //console.log('checkGroup', checkGroup)
        // console.log('checkGroup.categoryList', categoryList)

        // if(true) {
        //     ModelCreateGroupProduct.findOneAndUpdate({_id: req.body._id}, { $push: { categoryList: req.body.category }}, (err: any, data: any) => {
        //         if(err){
        //             res.setHeader('Access-Control-Allow-Origin', '*');
        //             res.status(200).json({status: false, ERROR: true, massage: "category not created", err});
        //         }else {
        //             res.setHeader('Access-Control-Allow-Origin', '*');
        //             res.status(200).json({status: true, ERROR: false, massage: "category created", data});
        //         }
        //     });
        // } else {
        //     res.setHeader('Access-Control-Allow-Origin', '*');
        //     res.status(200).json({status: true, ERROR: false, massage: "category already exists"});
        // }

        // res.setHeader('Access-Control-Allow-Origin', '*');
        // res.status(500).json({status: false, ERROR: true, massage: 'error'});

})