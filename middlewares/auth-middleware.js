import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const checkUserAuth = async (req,res,next)=>{
    let token
    const { authorization } = req.headers

    if(authorization && authorization.startsWith('Bearer')){
        try {
            token = authorization.split(' ')[1]

            const {userId} = jwt.verify(token,process.env.JWT_SECRET_KEY)
            req.user = await userModel.findById(userId).select('-password')
            next()
        } catch (error) {
            console.log(error)
            res.status(401).send({"status":"failed","msg":"Unauthorized User"})
        }
    }
    if(!token){
        res.status(401).send({"status":"failed","msg":"Unauthorized User,No Token"})
    }
}

export default checkUserAuth