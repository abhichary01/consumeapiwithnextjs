import { NextApiRequest, NextApiResponse } from "next";
import { ITrade, Trade } from "../../../src/models/trade";
import ConnectDB  from '../../../src/utils'

async function trade(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        try {
            await ConnectDB()
            const body: ITrade = JSON.parse(req.body)
            const newPost = new Trade(body)
            const saved = await newPost.save()
            res.send(saved)
        } catch (err) {
            console.log(err)
            res.status(500).send("error")
        }
    } else {
        res.status(405).json({ messagge: "Method not allowed" })
    }
}

export default trade