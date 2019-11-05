const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    creator: String,
    content: String,
    createdAt: {type: Date, default: Date.now}
});


module.exports = mongoose.model("Comment", commentSchema)
