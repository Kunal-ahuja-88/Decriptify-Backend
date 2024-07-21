import { ethers } from "ethers"
import UserModel from "../models/Users.js";
import jwt from "jsonwebtoken"
import { JWT_SECRETKEY } from "../config/serverConfig.js";

export async function authController(req,res,next) {
     

     try {
        const {signature} = req.body;
        const {address} = req.query;
        
            if(!signature) {
                throw new Error("Signature is invalid");
            }

            const recoveredAddress = ethers.utils.verifyMessage("Welcome to Decryptify",signature)
            console.log(recoveredAddress)


           
            if(address.toLowerCase()===recoveredAddress.toLowerCase()) {
                const address = recoveredAddress.toLowerCase()
                
                const user = await UserModel.findOne({userAddress : address})

                if(!user) {
                    const userData = await UserModel.create({userAddress : address})
                    console.log(userData)
                }
                 const token = jwt.sign({
                 address
                 },JWT_SECRETKEY)
                res.status(200).json({message : "Authentication Successfull",token})
            }

            else {
                res.status(400).json({message : "Authentication Failed"})
            }
            
     } catch (error) {
         console.log(error);
         res.status(500).json({message:"Internal server error"})
     }
}

