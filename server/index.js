import express from "express"
import cors from "cors"
const app = express();
import {MONGODB_URL , PORT} from './config/serverConfig.js'
import connectDb from "./db/connect.js";
import authenticationRoute from "./routes/authenticationRoute.js"

app.use(cors())
app.use(express.json())

app.use('/api',authenticationRoute)

async function serverStart() {

    try {
        await connectDb(MONGODB_URL)
        console.log("Connected to Database")
        app.listen(PORT , () => {
            console.log("Server is running")
        })
    } catch (error) {
        console.log(error)
    }
   
}

serverStart()


