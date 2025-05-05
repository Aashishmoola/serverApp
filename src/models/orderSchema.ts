import mongoose, {Schema, Document} from "mongoose"
import { shippingAddressSchema, IShippingAddress } from "./userSchema"
import { orderStatus } from "../types/globalTypes"
import { getProductInDB } from "../dBHandlers/productDBHandler"

export {Order, IOrder, IOrderItems}

interface IOrderItems extends Document {
    productName: string,
    productId: mongoose.Types.ObjectId,
    quantity: number,
}

interface IOrder extends Document {
    orderItems: IOrderItems,
    shippingAddress: IShippingAddress,
    phoneNumber: number,
    status: orderStatus,
    totalPrice: number,
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
        required: true
    },
    quantity: {
        type: Number,
        required: true,
    }
})

const orderSchema = new Schema<IOrder> ({
    orderItems: {
        type: orderItemsSchema,
        required: true,
    },
    shippingAddress: {
        type: shippingAddressSchema,
        required: true
    },
    phoneNumber: Number,
    status: {
        type: String, 
        default: "Processing"
    },
    totalPrice: {
        type: Number,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    dateOrdered: Date

})

// populate the productName if not set 

orderSchema.pre("save", async function(this: IOrder){
    if (!this.orderItems.productName) {
        const product = await getProductInDB(null, this.orderItems.productId)
        this.orderItems.productName = product.name
    }
})

const Order = mongoose.model("Orders", orderSchema)