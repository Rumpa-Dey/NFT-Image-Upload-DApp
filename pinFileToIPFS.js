const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
require('dotenv').config();

async function pinFileToIPFS(filePath) {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

  const data = new FormData();
  data.append('file', fs.createReadStream(filePath));

  const res = await axios.post(url, data, {
    maxContentLength: Infinity,
    headers: {
      ...data.getHeaders(),
      pinata_api_key: process.env.PINATA_API_KEY,
      pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY,
    },
  });

  console.log("✅ Image uploaded to IPFS");
  console.log("📝 IPFS Hash:", res.data.IpfsHash);
  return `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
}

module.exports = pinFileToIPFS; // ✅ This is the fix
