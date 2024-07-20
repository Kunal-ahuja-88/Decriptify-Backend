import { ethers } from "ethers"
import UserModel from "../models/Users.js";
import { PINATA_APIKEY , PINATA_SECRETKEY } from "../config/serverConfig.js";
import pinataSDK from '@pinata/sdk';
import generateEncryptionKey from "../utils/generateKey.js";
import encryptFile from "../utils/encryption.js";

export async function uploadImageController(req,res,next) {
     
     try {

      const address = "0x4B78Db97B90Fa4a33FFE1034c4688b7940C05614"
      const userAddress = address.toLowerCase()

      const user = await UserModel.findOne({userAddress:userAddress})

      if(!user) {
       throw new Error("User doesn't exist")
      }

      if(user.encryptionKey===null) {
         const encryptionKey = generateEncryptionKey(32);
         user.encryptionKey=encryptionKey;
         await user.save()
      }
      
      const {encryptedData , iv} = encryptFile(req.file.buffer , user.encryptionKey)
      console.log(encryptedData)

       console.log(req.file)

        const pinata = new pinataSDK({ pinataApiKey:PINATA_APIKEY, pinataSecretApiKey:PINATA_SECRETKEY });
        
      res.status(200).json({message : "Image Uploaded"})
            
     } catch (error) {
      console.log(error);
      res.status(500).json({message:"Internal server error"})
     }
}

