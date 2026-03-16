const mongoose= require('mongoose')
const Schema = mongoose.Schema

const secretSchema = new Schema({
    ciphertext : Buffer ,
    iv: Buffer,
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '24h'
    }
})

const Secret = mongoose.model('Secret', secretSchema)

module.exports = Secret