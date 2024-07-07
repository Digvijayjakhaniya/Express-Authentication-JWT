import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    tc:{type:Boolean,required:true},
})

const userModel = await mongoose.model('user',userSchema)

export default userModel