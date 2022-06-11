const mongoose=require('mongoose')

let schema=mongoose.Schema

const userSchema=new schema({
   
    emailId:{type:String},
    password:{type:String}
})

let userModel= mongoose.model('user',userSchema)
module.exports=userModel
 
   



