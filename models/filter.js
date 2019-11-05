const mongoose = require("mongoose")

const filterSchema = new mongoose.Schema({
    name: String
});


module.exports = mongoose.model("Filter", filterSchema)
