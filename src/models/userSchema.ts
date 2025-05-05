import mongoose, {Schema, Document} from "mongoose"

export {User, IUser}

export {shippingAddressSchema, IShippingAddress}
interface IShippingAddress extends Document{
    streetAddress: string,
    unitNumber: string, // To include special characters
    city: string,
    state: string,
    country: string,
    postalCode: number,
}

interface IUser extends Document {
    userName: string,
    email: string,
    passwordHash: string,
    shippingAddress: IShippingAddress,
    phoneNum: number,
    _isAdmin: boolean,
}

const shippingAddressSchema = new Schema <IShippingAddress> ({
    streetAddress: {
        type: String,
        required : true,
    },
    unitNumber: {
        type: String,
        required : true,
    },
    city: String,
    state: String,
    country: {
        type: String,
        required : true,
    },
    postalCode: {
        type: Number,
        required : true,
    },
})

const userSchema = new Schema<IUser>({
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    shippingAddress: shippingAddressSchema,
    phoneNum: Number,
    _isAdmin: {
        type: Boolean,
        required: true,
    }
})

const User = mongoose.model("Users", userSchema)