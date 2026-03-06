const mongoose= require('mongoose')
const Schema = mongoose.Schema

const secretSchema = new Schema({
    msg : {type:String, required: true} ,
},{timestamps:true})

const Secret = mongoose.model('Secret', secretSchema)

module.exports = Secret