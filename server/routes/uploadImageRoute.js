import express from "express"

import {uploadImageController} from "../controllers/uploadImageController.js"

const router = express.Router();
router.post('/uploadImage',uploadImageController)

export default router
