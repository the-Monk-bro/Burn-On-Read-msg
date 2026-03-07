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
    const link = `http://localhost:3000/secret/${secret._id}`
    res.status(201).json({msg : "Secret message received", secret: secret, link : link})
})

app.get('/secret/:id', async(req,res)=>{
    try {
        const secret = await Secret.findByIdAndDelete(req.params.id)
        if (!secret) {
            return res.status(404).send('Already exploded')
        }
        res.send(secret.msg)
    } catch (error) {
        if (error.name === "CastError") {
        return res.status(400).send("Invalid link") 
        }

    res.status(500).send("Server error" )
    }
})
  





  

