import multer from "multer";

// Configure storage
const storage = multer.memoryStorage();

// Debug storage configuration


const uploadUserImage = multer({ storage }).single('file');



export default uploadUserImage ;


