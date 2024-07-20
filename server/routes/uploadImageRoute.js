import express from "express"

import {uploadImageController} from "../controllers/uploadImageController.js"
import uploadUserImage from "../middleware/multer.js"
const router = express.Router();
router.post('/uploadImage', uploadUserImage,uploadImageController)

export default router
