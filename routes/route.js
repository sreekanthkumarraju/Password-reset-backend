
const express=require('express')
let userModel=require('../models/mongoose')
const Token = require("../models/token");

const sendEmail = require("../utils/sendmail");
const crypto = require("crypto");

const router=express.Router()
const app=express()

router.post('/forgotpassword',async(req,res)=>{
    let user=await userModel.findOne({emailId:req.body.emailId})
   
    console.log(user)

    if(!user)
      {
          res.json({
              statusCode:400,
              message:"Emaild doesnot exist"
           })
      }

     else
      {
        let token = await Token.findOne({ userId: user._id });
      
           if (!token)
            {
               token = await new Token({
                         userId: user._id,
                         token: crypto.randomBytes(32).toString("hex"),
                  }).save();
             }
   
               const link = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}`;
               console.log(link)
               console.log(token)
              // await sendEmail(
                //     user.emailId,
                 //      "Password reset", link);

               
                 await sendEmail
                      (
                           user.emailId,
                           "Password reset",
                            {
                               name:user.firstName,
                                link:link,
                             },
                           "./template/requestResetPassword.handlebars" 
                       );

                       let id=user._id
                       let tokengenerated=token.token
      
                       res.json({
                                 statusCode:200,
                                  message:"password reset link sent to your email",
               

                                })
      }
})

 router.post('/password-reset/:id/:token',async(req,res)=>{
    try 
    {
    
          console.log(req.params.id)
           let id=req.params.id
    
           const user =await userModel.findById(req.params.id)
           console.log(user)
     
           if (!user) return res.status(400).send("invalid link or expired");

             const token =await Token.findOne({
                                       userId: user._id,
                                       token: req.params.token,
                   });
 
           if (!token) return res.status(400).send("Invalid link or expired");

     
      

     
           await userModel.updateOne(
                           { _id:id},
                           { $set: { password: req.body.passworddata} },
                           { new: true }
                      );
     
            await user.save();
           
            sendEmail(
                     user.emailId,
                     "Password Reset Successfully",
                     {
                          name: user.firstName,
                      },
                       "./template/resetPassword.handlebars"
                    );

                    res.send("password reset is sucessfull.");

     
            await token.delete();

         
 
   } 
   catch (error) {
     res.send("An error occured");
     console.log(error);
   }

 })

router.get("/password-reset/:id/:token",async(req,res)=>{
    try {
		const user = await userModel.findOne({ _id: req.params.id });
		if (!user) return res.status(400).send({ message: "Invalid link" });

		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token) return res.status(400).send({ message: "Invalid link" });

		res.status(200).send("Valid Url");
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
})


module.exports=router