const express = require("express");
const multer = require("multer");
const cors = require("cors");
require("dotenv").config();
const pinFileToIPFS = require("./pinFileToIPFS");
const pinJSONToIPFS = require("./pinJSONToIPFS");

const app = express();
app.use(cors());
const upload = multer({ dest: "uploads/" });

app.post("/api/upload", upload.single("file"), async (req, res) => {
  try {
    const filePath = req.file.path;
console.log("Received file:", req.file);
    const imageURI = await pinFileToIPFS(filePath);
    const metadata = {
      name: "Profile Picture NFT",
      description: "A unique profile picture NFT",
      image: imageURI,
    };

    const tokenURI = await pinJSONToIPFS(metadata);

    res.json({ tokenURI });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Upload failed" });
  }
});


app.listen(4000, () => console.log("Server running on http://localhost:4000"));
