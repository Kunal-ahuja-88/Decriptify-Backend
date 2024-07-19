import express from "express"
import cors from "cors"
const app = express();
import authenticationRoute from "./routes/authenticationRoute.js"

app.use(cors())
app.use(express.json())

app.use('/api',authenticationRoute)


app.listen(3000 , () => {
    console.log("Server is running")
})

