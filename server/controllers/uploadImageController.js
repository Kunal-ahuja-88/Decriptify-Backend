import { ethers } from "ethers"
import UserModel from "../models/Users.js";
import { PINATA_APIKEY , PINATA_SECRETKEY } from "../config/serverConfig.js";
import pinataSDK from '@pinata/sdk';


export async function uploadImageController(req,res,next) {
     
   
     try {
       
        const pinata = new pinataSDK({ pinataApiKey:PINATA_APIKEY, pinataSecretApiKey:PINATA_SECRETKEY });
        const res = await pinata.testAuthentication()
        console.log(res)
            
     } catch (error) {
      console.log(error);
      res.status(500).json({message:"Internal server error"})
     }
}

