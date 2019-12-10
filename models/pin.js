const mongoose = require("mongoose")

const pinSchema = new mongoose.Schema({
    name: String,
    image: String,
    address: {
        street: String,
        number: Number
    },
    location: {
        type: {type: String, default: 'Point'},
        coordinates: [Number]
    },
    filters: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Filter"
        }
    ],
    details: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Detail"
    }
});

pinSchema.index({ location: "2dsphere" })

module.exports = mongoose.model("Pin", pinSchema)
