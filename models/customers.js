const mongoose = require('mongoose')

const CustomerSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    org:{
        type:String,
    },
    end:{
        type:Date,
    }
})

module.exports = mongoose.model("Customer", CustomerSchema)