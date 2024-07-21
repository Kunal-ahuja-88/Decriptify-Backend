import { JWT_SECRETKEY } from "../config/serverConfig.js"
import jwt from "jsonwebtoken"

async function authenticateToken(req,res,next)  {
    try {
        const token = req.headers['x-access-token']
     console.log(token)
      
     const decode = jwt.verify(token , JWT_SECRETKEY)
     req.address=decode.address
     next()

    } catch (error) {
        res.status(500).json({message : "Internal Server Error"})
    }
     
}

export default authenticateToken