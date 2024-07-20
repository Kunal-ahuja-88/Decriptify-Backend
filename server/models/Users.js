import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    userAddress : {
        type : String,
        requires : true
    },
    encryptionKey : {
        type : Buffer,
        default : null
    },
    creationTime : {
        type : Date,
        default : Date.now()
    }

})

const UserModel = mongoose.model("UserModel",UserSchema)

export default UserModel