import crypto from "crypto"

//function  to generate secure encryption key

const generateEncryptionKey = (length) => {
    return crypto.randomBytes(length/2).toString('hex');
}

export default generateEncryptionKey