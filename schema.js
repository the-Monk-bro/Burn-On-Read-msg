const mongoose= require('mongoose')
const Schema = mongoose.Schema

const secretSchema = new Schema({
    msg : {type:String, required: true} ,
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 10
    }
})

const Secret = mongoose.model('Secret', secretSchema)

module.exports = Secret