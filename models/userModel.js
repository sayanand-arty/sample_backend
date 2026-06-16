import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String, unique:true},
    pass:{type:String, required:true, minlength:8},
})
const User = mongoose.model('users',userSchema)

export default User