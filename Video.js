const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    file: String,
    thumbnail: String,
    views: { type: Number, default: 0 },
    uploadDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Video", videoSchema);