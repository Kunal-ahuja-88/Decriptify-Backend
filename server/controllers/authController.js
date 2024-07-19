import { ethers } from "ethers"

export async function authController(req,res,next) {
     

     try {
        const {signature} = req.body;
        const {address} = req.query;
        
            if(!signature) {
                throw new Error("Signature is invalid");
            }

            const recoveredAddress = ethers.utils.verifyMessage("Welcome to Decryptify",signature)
            console.log(recoveredAddress)
            
     } catch (error) {
         console.log(error);
         res.status(500).json({message:"Internal server error"})
     }
}

