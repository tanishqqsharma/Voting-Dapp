const hre = require("hardhat");

async function main() {
  const VotingSystem = await hre.ethers.getContractFactory("VotingSystem");
  const voting = await VotingSystem.deploy();

  await voting.waitForDeployment();
  const address = await voting.getAddress();

  console.log("VotingSystem deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});