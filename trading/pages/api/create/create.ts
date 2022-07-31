import { NextApiRequest, NextApiResponse } from "next";
import { Post } from '../../../src/models/posts'
import { IPost } from '../../../src/models/posts'
import ConnectDB  from '../../../src/utils'

async function getPosts(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        try {
            await ConnectDB()
            const body: IPost = JSON.parse(req.body)
            const newPost = new Post(body)
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

export default getPosts
