const express= require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const Secret = require ('./schema.js')


const port = process.env.PORT
const mongoUri = process.env.MONGO_URI
const base_url = process.env.BASE_URL

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
    try {
        const {
            ciphertext,
            iv,
            secretType = "text",
            fileName = null,
            mimeType = null,
            fileSize = null
        } = req.body

        if (!Array.isArray(ciphertext) || !Array.isArray(iv)) {
            return res.status(400).json({ msg: "Invalid payload", err: true, desc: "ciphertext and iv are required arrays." })
        }

        const secret = await Secret.create({
            ciphertext: Buffer.from(ciphertext),
            iv: Buffer.from(iv),
            secretType,
            fileName,
            mimeType,
            fileSize
        })

        const link = `${base_url}/${secret._id}`
        res.status(201).json({msg : "Secret message received",secret: secret, link : link})
    } catch (error) {
        res.status(500).json({msg:"Server Error", err:true, desc:"Sorry, the server is facing some issues in saving your secret."})
    }
})

app.get('/secret/:id', async(req,res)=>{
    try {
        const secret = await Secret.findByIdAndDelete(req.params.id)
        if (!secret) {
            return res.status(404).json({msg: "Secret Exploded", err:true, desc:"This secret has already been viewed and permanently deleted from our servers."})
        }
        res.json({
            ciphertext: Array.from(secret.ciphertext),
            iv: Array.from(secret.iv),
            secretType: secret.secretType || "text",
            fileName: secret.fileName || null,
            mimeType: secret.mimeType || null,
            fileSize: secret.fileSize || null,
            err:false
        })
    } catch (error) {
        if (error.name === "CastError") {
        return res.status(400).json({msg: "Invalid Link", err:true, desc: "The secret id in this link is not of correct format."}) 
        }

        res.status(500).json({msg:"Server Error", err:true, desc:"Sorry, the server is facing some issues in retrieving your secret message."})
    }
})
  





  
