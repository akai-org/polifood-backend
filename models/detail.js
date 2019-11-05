const mongoose = require("mongoose")

const detailSchema = new mongoose.Schema({
    description: String,
    menu: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "MenuItem"
        }
    ],
    hours: {
        monday: {
            from: String,
            to: String
        },
        tuesday: {
            from: String,
            to: String
        },
        wednesday: {
            from: String,
            to: String
        },
        thursday: {
            from: String,
            to: String
        },
        friday: {
            from: String,
            to: String
        },
        saturday: {
            from: String,
            to: String
        },
        sunday: {
            from: String,
            to: String
        }
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});


module.exports = mongoose.model("Detail", detailSchema)
