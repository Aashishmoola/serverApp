import mongoose, {Schema, Document}  from "mongoose"

export {Category, ICategory}

interface ICategory extends Document {
    name: string,
    color: string,
    icon: string,
    image: string,
}

const categorySchema = new Schema<ICategory>({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    color: { // Stored as a rgb in hexadecimal format
        type: String,
        default: "ffffff",
        unique: true,
    },
    icon: String,
    image: String,
})

const Category = mongoose.model("Category", categorySchema)
