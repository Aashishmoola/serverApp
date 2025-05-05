import mongoose, {Schema, Document} from "mongoose"
import { getCategoryInDB } from "../controllers/categoryController";

export {Product, IProduct}

// Must extend Document for TS to validate the methods of compiled model
interface IProduct extends Document {
    name: string;
    description?: string;
    richDescription?: string;
    imageURL?: string;
    imagesURL?: string[];
    brand?: string;
    price: number;
    categoryName?: string;
    categoryId?: mongoose.Types.ObjectId;
    countInStock?: number;
    rating?: number;
    isFeatured?: boolean;
    dateCreated?: Date;
}

const productSchema = new Schema<IProduct>({
    // unique id is automatically initialised by mongoDB
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: String,
    richDescription: String, // Contains product specific html parsed as a string 
    imageURL: String,
    imagesURL: [String],

    brand: String,
    price: {
        type: Number,
        required: true,
    },
    categoryName: String,
    categoryId: {   // Must link to _id of Category as per categorySchema
        type: Schema.Types.ObjectId,
        ref: "Category",
    },
    countInStock: Number,
    rating: Number,
    isFeatured: Boolean, // To be featured on homePage of frontend app
    dateCreated: Date,
    
})

// Middlewares (Different types of middlewares in mongoose)
// Must define middleware on schemaName.prototype before compiling model


// "this" needs to be explicitly typed in TS

// Populate categoryId field in product doc if not set
productSchema.pre("save", async function(this: IProduct) {
    // check if categoryName exists & !== undefined but categoryId does not exist| === undefined as it is not a required field
    if (!this.categoryId && this.categoryName) {
        const category= await getCategoryInDB(this.categoryName)
        this.categoryId = category._id as mongoose.Types.ObjectId
    } 
})

// "Product" is the name of the collection instanciated in mongo DB
const Product = mongoose.model("Product", productSchema)