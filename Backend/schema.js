const mongoose= require('mongoose')
const Schema = mongoose.Schema

const secretSchema = new Schema({
    ciphertext : Buffer ,
    iv: Buffer,
    secretType: {
        type: String,
        enum: ["text", "file"],
        default: "text"
    },
    fileName: {
        type: String,
        default: null
    },
    mimeType: {
        type: String,
        default: null
    },
    fileSize: {
        type: Number,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '24h'
    }
})

const Secret = mongoose.model('Secret', secretSchema)

module.exports = Secret
