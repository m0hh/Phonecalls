const mongoose = require("mongoose")

const pCustomersSchema = new mongoose.Schema({
    name: String,
    org: String,
})

module.exports = mongoose.model('Pcustomers', pCustomersSchema)