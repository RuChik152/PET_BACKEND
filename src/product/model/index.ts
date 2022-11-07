import {Schema, model} from "mongoose";

const SchemaCreateProduct = new Schema({
    name:{
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        default: 1
    },
    madeCountry: {
        type:String,
        default: "NoName"
    },
    discount: {
        type: Number,
        default: 0
    }
}, {
    timestamps:true,
});

export const ModelCreateProduct = model('ModelCreateProduct', SchemaCreateProduct, 'products');

const SchemaCreateCategoryProduct = new Schema({
    name:{
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    productList: [ModelCreateProduct.schema]
}, {
    timestamps: true
});

export const ModelCreateCategoryProduct = model('ModelCreateCategoryProduct', SchemaCreateCategoryProduct, 'products');

const SchemaCreateGroupProduct = new Schema({
    name:{
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    categoryList: [ModelCreateCategoryProduct.schema]
}, {
    timestamps: true
});

export const ModelCreateGroupProduct = model('ModelCreateGroupProduct', SchemaCreateGroupProduct, 'products');