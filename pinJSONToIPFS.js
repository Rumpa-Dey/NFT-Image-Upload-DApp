const axios = require('axios');
require('dotenv').config();

async function pinJSONToIPFS(metadata) {
  const url = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';
try {
  const response = await axios.post(url, metadata, {
    headers: {
      'Content-Type': 'application/json',
      pinata_api_key: process.env.PINATA_API_KEY,
      pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY
    }
  });

  console.log("✅ Metadata uploaded to IPFS");
  console.log("📝 IPFS Hash:", response.data.IpfsHash);
  return response.data.IpfsHash;
} catch (err) {
  console.error("❌ Error uploading JSON to IPFS:", err.message);
  throw err;
}
}
module.exports = pinJSONToIPFS;
