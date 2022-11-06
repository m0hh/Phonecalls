const express = require('express')
const router = express.Router()
const PCustomer = require('../models/pCustomers')
const Customer = require('../models/customers')
const multerConfig = require('../config/multerConfig')
const auth = require('../middleware/auth')
const csv = require('csvtojson')
const { response } = require('express')


router.post('/', multerConfig.saveToUploads,async(req,res)=>{
    const response = await csv().fromFile(req.file.path)
    try{
        const pcustomers = await PCustomer.insertMany(response)
        res.status(201).json({message:"Done succesfuly"})
    } catch(err){
        res.status(500).json({message:err.message})
    }
})

router.get('/',async (req,res)=> {
    try{
        const pcustomers = await PCustomer.find()
        res.status(200).json(pcustomers)
    } catch (err){
        res.status(500).json({message:err.message})
    }
})

router.patch('/:id',getOne, async (req,res)=>{
    if (req.body.accepted == true){
        try{
            const customer = new Customer({
                name : req.pcustomer.name,
                org : req.pcustomer.org,
                end : new Date(new Date().setFullYear(new Date().getFullYear() + 1))
            })
            const newcustomer = await customer.save()
            await req.pcustomer.remove()
            res.status(201).json(newcustomer)
        }catch (err) {
            res.status(500).json({message: err.message})
        }
    }else{
        if (req.body.name != null){
            req.pcustomer.name = req.body.name
        }
        if(req.body.org != null){
            req.pcustomer.org =req.body.org
        }
        console.log(req.body.accepted)
        try{
            updatedPCustomer = await req.pcustomer.save()
            res.status(200).json(updatedPCustomer)
        }catch (err){
            res.status(500).json({message:err.message})
        }
    }
})

router.delete("/:id", getOne, async(req,res)=>{
    try{
        await req.pcustomer.remove()
        res.status(200).json({message:"Deleted succesfuly"})
    }catch (err){
        res.status(500).json({message:err.message})
    }
})

async function getOne(req,res,next){
    let pcustomer
    try{
        pcustomer = await PCustomer.findById(req.params.id)
        if(pcustomer == null){
            res.status(400).json({message:"Customer not found"})
        }
    }catch(err){
        res.status(500).json({message:err.message})
    }
    req.pcustomer = pcustomer
    next()
}

module.exports = router