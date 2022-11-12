import mongoose, {Schema, model} from "mongoose";

const SchemaCreateProduct = new Schema({
    name:{
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: 'Description is not exist'
    },
    price: {
        type: Number,
        default: 0
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
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ModelCreateGroupProduct',
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ModelCreateCategoryProduct',
        required: true
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
}, {
    timestamps: true
});

export const ModelCreateCategoryProduct = model('ModelCreateCategoryProduct', SchemaCreateCategoryProduct, 'categoryProduct');

const SchemaCreateGroupProduct = new Schema({
    name:{
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

export const ModelCreateGroupProduct = model('ModelCreateGroupProduct', SchemaCreateGroupProduct, 'groupProduct');