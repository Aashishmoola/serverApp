import mongoose, {Schema, Document} from "mongoose"
import { shippingAddressSchema, IShippingAddress } from "./userSchema"

export {Order}

interface IOrderItems extends Document {
    productName: string,
    productId: mongoose.Types.ObjectId,
    quantity: number,
}

interface IOrder extends Document {
    orderItems: IOrderItems[],
    shippingAddress: IShippingAddress,
    phoneNumber: number,
    status: "Processing" | "In Transit" | "Delivered",
    totalPrice: number,
    userName: string,
    user: mongoose.Types.ObjectId,
    dateOrdered: Date

}


const orderItemsSchema = new Schema<IOrderItems>({
    productName: {
        type: String,
        required: true,
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
    },
    quantity: {
        type: Number,
        required: true,
    }
})

const orderSchema = new Schema<IOrder> ({
    orderItems: {
        type: [orderItemsSchema],
        required: true,
    },
    shippingAddress: {
        type: shippingAddressSchema,
        required: true
    },
    phoneNumber: Number,
    status: {
        type: String, 
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    userName: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    dateOrdered: Date

})

const Order = mongoose.model("Orders", orderSchema)