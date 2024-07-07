import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import transporter from "../config/emailConfig.js";

class userController {
    static Registration = async (req,res)=>{
        const {name,email,password,con_password,tc} = req.body
        const existUser =  await userModel.findOne({email:email})

        if(existUser){
            res.send({"status":"failed","msg":"Email Already Exists"})
        }else{
            if(name && email && password && con_password && tc){
                if(password == con_password){
                    try {
                        const salt = await bcrypt.genSalt(10)
                        const hashpass = await bcrypt.hash(password,salt)
                        const oneUser = new userModel({
                            name:name,
                            email:email,
                            password:hashpass,
                            tc:tc
                        })
                        await oneUser.save()
                        const saved_user = await userModel.findOne({email:email})

                        // generate JWT Token 
                        const token = jwt.sign({userId:saved_user._id},process.env.JWT_SECRET_KEY,{expiresIn:'5d'})

                        res.send({"status":"success","msg":"user register successfully !","token":token})
                    } catch (error) {
                        res.send({"status":"failed","msg":"Unable to Register"})
                    }
                }else{
                    res.send({"status":"failed","msg":"password and confirm password doesn't match"})
                }
            }else{
                res.send({"status":"failed","msg":"All Fields Required"})
            }
        }
    }

    static Login = async (req,res)=>{
        try {
            const {email,password} = req.body
            
            if(email && password){
                const existUser = await userModel.findOne({email:email})
                
                if(existUser){
                    const isMatch = await bcrypt.compare(password,existUser.password)
                    if(existUser.email == email && isMatch){
                        
                        // Generate JWT Token
                        const token = jwt.sign({userId:existUser._id},process.env.JWT_SECRET_KEY,{expiresIn:'5d'})
                        res.send({"status":"success","msg":"Login Successfully !","token":token})
                    }else{
                        res.send({"status":"failed","msg":"Email or Password is not Valid !"})
                    }
                }else{
                    res.send({"status":"failed","msg":"Given Email is not Registered"})
                }
            }else{
            res.send({"status":"failed","msg":"All Fields Required"})
            }
        } catch (error) {
            res.send({"status":"failed","msg":"Unable to Login"})
        }
    }

    static ChangePassword = async (req,res)=>{
        const {password,con_password} = req.body

        if(password && con_password){
            if(password === con_password){
                try {
                    const salt = await bcrypt.genSalt(10)
                    const newHashPassword = await bcrypt.hash(password,salt)
                    await userModel.findByIdAndUpdate(req.user._id,{password:newHashPassword})
                    res.send({"status":"success","msg":"password changed successfully !"})

                } catch (error) {
                    res.send({"status":"failed","msg":"Unable to Change Password, Try Again !"})
                }
            }else{
                res.send({"status":"failed","msg":"password and confirm password doesn't match"})
            }
        }else{
            res.send({"status":"failed","msg":"All Fields Required"})
        }
    }

    static LoggedUser = async (req,res)=>{
        res.send({"user":req.user})
    }

    static ResetPasswordEmail = async (req,res)=>{
        const {email} = req.body

        if(email){
            const existUser = await userModel.findOne({email:email})
            if(existUser){
                const secret = existUser._id + process.env.JWT_SECRET_KEY
                const token = jwt.sign({userId:existUser._id},secret,{expiresIn:'15m'})
                const link = `http://localhost:3000/api/user/reset/${existUser._id}/${token}`
                // Send Email 
                let info = await transporter.sendMail({
                    from: process.env.EMAIL_FROM,
                    to: existUser.email,
                    subject:'Reset Password Link from express-auth-JWT',
                    html:`<a href=${link}>Click Here</a> for Reset Password`
                })

                if(info){
                    res.send({"status":"success","msg":"Password reset email is sent... Please check your email !"})
                }else{
                    res.send({"status":"failed","msg":"Email is Not send , Please Try Again !"})
                }

            }else{
                res.send({"status":"failed","msg":"Given Email is not Registered"})
            }
        }else{
            res.send({"status":"failed","msg":"Email Field Required"})
        }
    }

    static ResetPassword = async (req,res)=>{
        const {password,con_password} = req.body
        const {id,token} = req.params
        
        try {
            const existUser = await userModel.findById(id)
            const new_secret = existUser._id + process.env.JWT_SECRET_KEY
            jwt.verify(token,new_secret)
             if(password && con_password){
                if(password === con_password){
                        const salt = await bcrypt.genSalt(10)
                        const newHashPassword = await bcrypt.hash(password,salt)

                        await userModel.findByIdAndUpdate(existUser._id,{password:newHashPassword})
                        res.send({"status":"success","msg":"Password Reset Successfully !"})
                    }else{
                    res.send({"status":"failed","msg":"password and confirm password doesn't match"})
                }
             }else{
                res.send({"status":"failed","msg":"All Fields Required"})
            }
        } catch (error) {
            res.send({"status":"failed","msg":"Invalid Token"})
        }
       
    }
}

export default userController