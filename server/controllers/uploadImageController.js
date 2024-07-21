import { ethers } from "ethers"
import UserModel from "../models/Users.js";
import { PINATA_APIKEY , PINATA_SECRETKEY } from "../config/serverConfig.js";
import pinataSDK from '@pinata/sdk';
import generateEncryptionKey from "../utils/generateKey.js";
import encryptFile from "../utils/encryption.js";

export async function uploadImageController(req,res,next) {
     
     try {
      const address = req.address
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
     

        const pinata = new pinataSDK({ pinataApiKey:PINATA_APIKEY, pinataSecretApiKey:PINATA_SECRETKEY });
        const resPinata = await pinata.pinJSONToIPFS({encryptedData,iv})
        console.log(resPinata)
        
      res.status(200).json({ipfsHash : resPinata.IpfsHash , message : "Image Uploaded"})
            
     } catch (error) {
      console.log(error);
      res.status(500).json({message:"Internal server error"})
     }
}

