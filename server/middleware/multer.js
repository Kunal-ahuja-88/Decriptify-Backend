import multer from "multer";

// Configure storage
const storage = multer.memoryStorage();

// Debug storage configuration
console.log(storage);

const uploadUserImage = multer({ storage }).single('file');



export default uploadUserImage ;


