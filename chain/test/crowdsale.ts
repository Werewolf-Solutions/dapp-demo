import { ethers } from "hardhat";
const price = ethers.utils.parseEther("0.0001");

// Initiate all contracts
async function deployment() {
  const [deployer, user, user2] = await ethers.getSigners();
  const initial_balance = await ethers.provider.getBalance(deployer.address);
  let ethusdPrice = BigInt(182288419300);

  // Deploy of MyToken.sol
  const MyToken = await ethers.getContractFactory("MyToken");
  const myToken = await MyToken.deploy();

  await myToken.deployed();

  console.log(`My Token deployed to ${myToken.address}`);

  await myToken.initialize();

  // Deploy of Crowdsale.sol
  const Crowdsale = await ethers.getContractFactory("Crowdsale");
  let startTime = Math.round(Date.now() / 1000);
  let endTime = Math.round((Date.now() + 1000 * 60 * 60 * 24 * 30 * 2) / 1000); // 2 months
  console.log(`Start: ${startTime}\nEnd: ${endTime}`);
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
    `User balance: ${ethers.utils.formatEther(
      await myToken.balanceOf(user.address)
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
  return {
    deployer,
    user,
    myToken,
    crowdsale,
  };
}

async function main() {
  const { deployer, user, myToken, crowdsale } = await deployment();
  var timestamp = await getBlockTimestamp();
  let approvedAmountToken = ethers.utils.parseEther("1000");
  let numberOfTokens = 1000;
  let p = numberOfTokens * Number(ethers.utils.formatEther(price.toString()));
  let value = ethers.utils.parseEther(p.toString()); // BigInt(numberOfTokens) * BigInt(price.toString()); // _numberOfTokens * tokenPrice
  // Grant allowance from the Token contract to the Crowdsale contract
  console.log(ethers.utils.formatEther(approvedAmountToken));
  console.log(numberOfTokens);
  console.log(p);
  console.log(Number(ethers.utils.formatEther(price.toString())));
  console.log(ethers.utils.formatEther(value));
  await myToken.approve(crowdsale.address, approvedAmountToken);

  console.log("Allowance granted successfully!");

  let allowance = await myToken.allowance(deployer.address, crowdsale.address);

  // console.log(
  //   `Check allowance ${ethers.utils.formatEther(
  //     allowance
  //   )} >= approvedAmountToken ${ethers.utils.formatEther(
  //     approvedAmountToken
  //   )} = ${
  //     ethers.utils.formatEther(allowance) >=
  //     ethers.utils.formatEther(approvedAmountToken)
  //   }`
  // );

  timestamp = await getBlockTimestamp();
  setTimeout(async () => {
    console.log("--------------------");
    console.log(`Timestamp: ${timestamp}`);
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
      `User balance: ${ethers.utils.formatEther(
        await myToken.balanceOf(user.address)
      )}`
    );

    console.log("--------------------");
    // User tries to buy token
    // Estimate the gas required for the transaction
    const estimatedGas = await crowdsale.estimateGas.buyTokens({
      value,
    });

    console.log(`Estimated gas: ${estimatedGas} @ ${timestamp}`);

    // Convert the value to ethers.BigNumber
    const transactionValue = ethers.utils.parseEther(value.toString());

    // Send the transaction with the specified number of tokens and value
    const transaction = await crowdsale.buyTokens({
      value,
      gasLimit: estimatedGas,
    });

    // Wait for the transaction to be mined
    await transaction.wait();

    console.log(transaction);

    console.log("Tokens purchased successfully!");

    console.log("--------------------");
    console.log(`Timestamp: ${timestamp}`);
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
      `User balance: ${ethers.utils.formatEther(
        await myToken.balanceOf(user.address)
      )}`
    );
    console.log("--------------------");
  }, 2000);
}

async function getBlockTimestamp() {
  let blockNumber = await ethers.provider.getBlockNumber();
  const timestamp = (await ethers.provider.getBlock(blockNumber)).timestamp;
  return timestamp;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
