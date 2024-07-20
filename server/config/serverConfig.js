import dotenv from 'dotenv';
dotenv.config();

export const MONGODB_URL = process.env.MONGODB_URL;
export const PORT = process.env.PORT || 3000;
export const PINATA_APIKEY = process.env.PINATA_APIKEY;
export const PINATA_SECRETKEY = process.env.PINATA_SECRETKEY;