import { ethers } from "hardhat";

const price = ethers.utils.parseEther("0.0001");

async function main() {
  const [deployer, user, user2] = await ethers.getSigners();
  const initial_balance = await ethers.provider.getBalance(deployer.address);
  let ethusdPrice = BigInt(182288419300);

  // Deploy of MyToken.sol
  const MyToken = await ethers.getContractFactory("MyToken");
  const myToken = await MyToken.deploy();

  await myToken.deployed();

  console.log(`My Token deployed to ${myToken.address}`);

  await myToken.initialize();

  // Deploy of MyNFT.sol
  const MyNFT = await ethers.getContractFactory("MyNFT");
  const myNFT = await MyNFT.deploy();

  await myNFT.deployed();

  console.log(`MyNFT deployed to ${myNFT.address}`);

  await myNFT.initialize();

  // Deploy of Crowdsale.sol
  let startTime = Math.round(Date.now() / 1000);
  let endTime = Math.round((Date.now() + 1000 * 60 * 60 * 24 * 30 * 2) / 1000); // 2 months
  console.log(`Start: ${startTime}\nEnd: ${endTime}`);
  const Crowdsale = await ethers.getContractFactory("Crowdsale");
  const crowdsale = await Crowdsale.deploy(
    myToken.address,
    price,
    startTime,
    endTime
  );

  await crowdsale.deployed();

  console.log(`Crowdsale deployed to ${crowdsale.address}`);

  // Send all tokens to crowdsale
  let amount = await myToken.balanceOf(deployer.address);
  let receipt = await myToken.transfer(crowdsale.address, amount);
  console.log(receipt);
  console.log(
    `Crowdsale balance: ${ethers.utils.formatEther(
      await myToken.balanceOf(crowdsale.address)
    )}`
  );
  console.log(
    `MyToken balance: ${ethers.utils.formatEther(
      await myToken.balanceOf(myToken.address)
    )}`
  );
  console.log(
    `Deployer balance: ${ethers.utils.formatEther(
      await myToken.balanceOf(deployer.address)
    )}`
  );

  console.log(
    `Start: ${await crowdsale.startTimestamp()}\nEnd: ${await crowdsale.endTimestamp()}\nPrice: ${ethers.utils.formatEther(
      await crowdsale.price()
    )}`
  );

  const final_balance = await ethers.provider.getBalance(deployer.address);
  let q = BigInt(initial_balance.toString()) - BigInt(final_balance.toString());
  let q_number = Number(ethers.utils.formatEther(q));
  let price_number = Number(ethusdPrice) / 10 ** 8;
  let diff = q_number * price_number;
  console.log(
    `Balance after Deploy
    Initial balance: ${ethers.utils.formatEther(initial_balance)}
    Final balance: ${ethers.utils.formatEther(final_balance)}
    ETH spent: ${ethers.utils.formatEther(q)}
    ETH spent in USD: ${diff}
    `
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
