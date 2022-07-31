import { NextApiRequest, NextApiResponse } from "next";
import { User } from '../../../src/models/users'
import { IUser } from '../../../src/models/users'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
const JWT_KEY = 'secret'

export default async function register(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        try {
            const user: any = await User.findOne({ email: req.body.email })

            if (user) {
                return res.status(404).send({
                    message: 'user already exists'
                })
            }
        
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
        
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            })
        
            const result = await newUser.save()
            const { password, ...data } = result.toJSON()
        
            res.send(data)
        } catch (err) {
            console.log(err)
            res.status(500).send("error")
        }
    } else {
        res.status(405).json({ messagge: "Method not allowed" })
    }
}
// export default async function login(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method === "POST") {
//         try {
//            const user: any = await User.findOne({ email: req.body.email })
    
//     if (!user) {
//         return res.status(404).send({
//             message: 'user not found'
//         })
//     }
    
//     const passwordCheck = await bcrypt.compare(req.body.password, user.password)
    
//     if (!passwordCheck) {
//         return res.status(404).send({
//             message: 'invalid credentials'
//         })
//     }
    
//     const token = jwt.sign({ _id: user.id }, JWT_KEY)
    
//     res.send({
//         message: 'login successful'
//     })
//     }catch (err) {
//         console.log(err)
//         res.status(500).send("error")
//     }
// }




// router.post('/register', async (req: Request, res: Response) => {
//     const user: any = await User.findOne({ email: req.body.email })

//     if (user) {
//         return res.status(404).send({
//             message: 'user already exists'
//         })
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(req.body.password, salt);

//     const newUser = new User({
//         name: req.body.name,
//         email: req.body.email,
//         password: hashedPassword
//     })

//     const result = await newUser.save()
//     const { password, ...data } = result.toJSON()

//     res.send(data)
// })