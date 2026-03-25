const express = require("express");
const multer = require("multer");
const Video = require("../models/Video");

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

// Upload video
router.post("/", upload.fields([
    { name: "video" },
    { name: "thumbnail" }
]), async (req, res) => {
    const video = new Video({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        file: req.files.video[0].filename,
        thumbnail: req.files.thumbnail[0].filename
    });

    await video.save();
    res.json(video);
});

// Get all videos
router.get("/", async (req, res) => {
    const videos = await Video.find().sort({ uploadDate: -1 });
    res.json(videos);
});

module.exports = router;