import mongoose, { Document, model, Model, Schema } from "mongoose"



export interface IPost extends Document {
    portfolioname: String,
    fallowance: String,
    totalvalue: String,
    symbol: String,
    marketWeight:String,
    currentAmount: String
}


const PostSchema: Schema = new Schema({
    portfolioname: {
        type: String
    },
    fallowance: {
        type: String
    },
    totalvalue: {
        type: String
    },
    symbol: {
        type:String},
    marketWeight: {type:String},
    currentAmount: {type:String}
})


export const Post: Model<IPost> = mongoose.models.Post || model("Post", PostSchema)