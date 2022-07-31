import { NextApiRequest, NextApiResponse } from "next";
import { Post } from "../../../src/models/posts"
import ConnectDB from "../../../src/utils"

export default async function getPosts(req: NextApiRequest, res: NextApiResponse) {
    try {
        await ConnectDB()
        const posts = await Post.find()
        res.json(posts)
    } catch (err) {
        console.log(err)
        res.status(500).send("error")
    }

}