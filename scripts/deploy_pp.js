const hre = require("hardhat");

async function main() {
  const PFPNFT = await hre.ethers.getContractFactory("PFPNFT");
  const pfp = await PFPNFT.deploy();
  await pfp.waitForDeployment();

  console.log("PFPNFT deployed to:", await pfp.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
