import { NextApiRequest, NextApiResponse } from "next";
import { Trade } from "../../../src/models";
import ConnectDB from "../../../src/utils"

export default async function getTrade(req: NextApiRequest, res: NextApiResponse) {
    try {
        await ConnectDB()
        const trades = await Trade.find()
        res.json(trades)
    } catch (err) {
        console.log(err)
        res.status(500).send("error")
    }

}