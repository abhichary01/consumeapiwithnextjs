import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../src/models";
import ConnectDB from "../../../src/utils"

export default async function getUsers(req: NextApiRequest, res: NextApiResponse) {
    try {
        await ConnectDB()
        const posts = await User.create()
        res.json(posts)
    } catch (err) {
        console.log(err)
        res.status(500).send("error")
    }

}