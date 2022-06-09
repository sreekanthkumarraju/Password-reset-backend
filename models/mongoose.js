const mongoose=require('mongoose')

let schema=mongoose.Schema

const userSchema=new schema({
   
    emailId:{type:String},
    password:{type:String}
})

let userModel= mongoose.model('user',userSchema)

//inserting users into database
let users=[
    {
         emailid:"rvsreekanthkumar90@gmail.com",
         password:"sree@143"
    },
    {
        emailid:"sreekanthit.10190@gmail.com",
        password:"heyy@143"
    },
    {
        emailid:"sanju@gmail.com",
        password:"heyy@143"
    },
   

]
 

 let insertData=(async(users)=>
 {
     for(let i=0;i<users.length;i++)
   {
    let findUsers=await userModel.findOne({emailId:users[i].emailid})
    if(findUsers)
     {
         console.log('user exist')
     }
     else{
    let user= new userModel({
      
        emailId:users[i].emailid,
        password:users[i].password
    })
    console.log(user)
     await user.save()
   }
  }
})
insertData(users)

module.exports=userModel
 
   



