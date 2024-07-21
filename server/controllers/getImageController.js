import UserModel from "../models/Users.js";
import { PINATA_APIKEY , PINATA_SECRETKEY } from "../config/serverConfig.js";
import pinataSDK from '@pinata/sdk';
import decryptData from "../utils/decryption.js"
import encryptFile from "../utils/encryption.js";
import axios from "axios"
const PINATA_GATEWAY_URL="https://gateway.pinata.cloud/ipfs/"

async function returnIpfsResponse(ipfsHash) {
  const res = await axios(`${PINATA_GATEWAY_URL}${ipfsHash}`)
  return res.data
}


export async function getImageController(req,res,next) {
     
     try {
        const address = req.address
        const userAddress = address.toLowerCase()
  
        const user = await UserModel.findOne({userAddress:userAddress})
        if(!user) {
          throw new Error("User doesn't exist")
         }

        const {page , limit} = req.query;
        const pageNumber = parseInt(page) || 1;
        const limitNumber = parseInt(limit) || 1;

        if(pageNumber <1 || limitNumber <1) {
          throw new Error("Pagination issue")
        }

        const startIndex = (pageNumber-1)*limitNumber;
        const endIndex = (pageNumber)*limitNumber;

        const ipfsHashArray = req.body.slice(startIndex,Math.min(req.body.length,endIndex));
        const decryptedImageArr = []
       
        
       if(ipfsHashArray.length!=0) {
            const encryptedDataArr =await Promise.all(ipfsHashArray.map(async(ipfsHash)=> {
              const res = await returnIpfsResponse(ipfsHash)
              return res
            }))

         for(const img of encryptedDataArr) {
               const decryptedImgData = decryptData(img.encryptedData,img.iv,user.encryptionKey)
                decryptedImageArr.push(decryptedImgData.toString('base64'))
         }

       }
         
       console.log(decryptedImageArr)
      
        
      res.status(200).json({message : "Image Sent",decryptedImageArr})
            
     } catch (error) {
      console.log(error);
      res.status(500).json({message:"Internal server error"})
     }
}

