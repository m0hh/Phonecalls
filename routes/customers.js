const express = require('express')
const router = express.Router()
const Customer = require('../models/customers')
const multerConfig = require('../config/multerConfig')
const auth = require('../middleware/auth')
const csv = require('csvtojson')
const { response } = require('express')


router.post('/', multerConfig.saveToUploads,async(req,res)=>{
    const response = await csv().fromFile(req.file.path)
    try{
        customers = await Customer.insertMany(response)
        res.status(201).json({message:"Done succesfuly"})
    } catch(err){
        res.status(500).json({message:err.message})
    }
})

router.get('/',async (req,res)=> {
    try{
        const customers = await Customer.find()
        res.status(200).json(customers)
    } catch (err){
        res.status(500).json({message:err.message})
    }
})



module.exports = router