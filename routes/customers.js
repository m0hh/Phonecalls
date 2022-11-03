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

router.patch('/:id',getOne, async (req,res)=>{
    if (req.body.name != null){
        req.customer.name = req.body.name
    }
    if(req.body.org != null){
        req.customer.org =req.body.org
    }
    if (req.body.end != null){
        req.customer.end = req.body.end
    }
    try{
        updatedCustomer = await req.customer.save()
        res.status(200).json(updatedCustomer)
    }catch (err){
        res.status(500).json({message:err.message})
    }
})

async function getOne(req,res,next){
    let customer
    try{
        customer = await Customer.findById(req.params.id)
        if(customer == null){
            res.status(400).json({message:"Customer not found"})
        }
    }catch(err){
        res.status(500).json({message:err.message})
    }
    req.customer = customer
    next()
}

module.exports = router