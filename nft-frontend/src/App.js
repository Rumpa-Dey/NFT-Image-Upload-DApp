import { useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import PFPNFT from "./contracts/PFPNFT.json";

const contractAddress = "0xBA9504C243171bE72A5AE999E4367c56Cc0a6726";

function App() {
  const [account, setAccount] = useState("");
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  async function connectWallet() {
    if (!window.ethereum) return alert("Please install MetaMask");
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    setAccount(accounts[0]);
  }

  async function handleMint() {
    if (!file) return alert("Please select an image");
    setStatus("Uploading image & metadata to IPFS...");

    try {
      // Send file to backend
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post("http://localhost:4000/api/upload", formData);
      const { tokenURI } = response.data;

      setStatus("Minting NFT on Polygon Amoy...");

      // Connect to contract and mint
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, PFPNFT, signer);

      const tx = await contract.mintNFT(account, tokenURI);
      await tx.wait();

      setStatus("✅ NFT successfully minted!");
    } catch (err) {
      console.error(err);
      setStatus("❌ Minting failed. See console.");
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>PFP NFT Minter</h2>

      {!account && <button onClick={connectWallet}>Connect Wallet</button>}
      {account && <p>Connected: {account}</p>}

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleMint}>Mint NFT</button>

      <p>{status}</p>
    </div>
  );
}

export default App;
