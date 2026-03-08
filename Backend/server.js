const express= require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')

const Secret = require ('./schema.js')


const port = process.env.PORT
const mongoUri = process.env.MONGO_URI



mongoose.connect(mongoUri)
    .then(
        app.listen(port, ()=>{
            console.log(`Server listening on port ${port}...`)
        })
    )
    .catch((err)=> console.error(err))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.post('/create', async(req,res)=>{
    const {msg} = req.body
    const secret = await Secret.create({msg})
    console.log (secret)
    const link = `http://127.0.0.1:5500/demoRead.html?id=${secret._id}`
    res.status(201).json({msg : "Secret message received", secret: secret, link : link})
})

app.get('/secret/:id', async(req,res)=>{
    try {
        const secret = await Secret.findByIdAndDelete(req.params.id)
        if (!secret) {
            return res.status(404).json({msg: 'Already exploded'})
        }
        res.json({msg: secret.msg})
    } catch (error) {
        if (error.name === "CastError") {
        return res.status(400).json({msg: "Invalid link"}) 
        }

        res.status(500).json({msg: error.name})
    }
})
  





  

