import mongoose, { Document, model, Model, Schema } from "mongoose"



export interface ITrade extends Document {
    symbol: String,
    initialPrice: String,
    amountSellable: String,
    priceToSell: String,
    priceToBuy:String
}


const TradeSchema: Schema = new Schema({
    symbol: {
        type: String
    },
    initialPrice: {
        type: String
    },
    amountSellable: {
        type: String
    },
    priceToSell: {
        type:String},
    priceToBuy: {type:String},
})


export const Trade: Model<ITrade> = mongoose.models.Trade || model("Trade", TradeSchema)