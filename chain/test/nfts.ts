import { ethers } from "hardhat";
const price = ethers.utils.parseEther("0.0001");

// Initiate all contracts
async function deployment() {
  const [deployer, user, user2] = await ethers.getSigners();
  const initial_balance = await ethers.provider.getBalance(deployer.address);
  let ethusdPrice = BigInt(182288419300);

  // Deploy of MyToken.sol
  // const MyToken = await ethers.getContractFactory("MyToken");
  // const myToken = await MyToken.deploy();

  // await myToken.deployed();

  // console.log(`My Token deployed to ${myToken.address}`);

  // await myToken.initialize();

  // Deploy of MyNFT.sol
  const MyNFT = await ethers.getContractFactory("MyNFT");
  const myNFT = await MyNFT.deploy();

  await myNFT.deployed();

  console.log(`MyNFT deployed to ${myNFT.address}`);

  await myNFT.initialize();

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
    myNFT,
  };
}

async function main() {
  const { deployer, myNFT } = await deployment();

  // safeMint(address to, string memory uri)
  // let nft1 =
  //   "https://bafybeibhifsub43cc2lxbyawugxglna23eyu57wucimomhkngd2kplntfu.ipfs.w3s.link/nft-1.jpg";
  // let deploy1 = await myNFT.safeMint(deployer.address, nft1);
  // console.log(deploy1);
  // let nft2 =
  //   "https://bafybeifmyv27tgkjtyxn767dc4375my2ylm7h3wr4yerdo7jssack25qq4.ipfs.w3s.link/nft-2.jpg";
  // (await myNFT.safeMint(deployer.address, nft2)).wait();
  // console.log("Nft 2 deployed");
  // let nft3 =
  //   "https://bafybeibcl644mzfc7revyntw5qozui2rtyhgsbl3xuxtsiqw5umu27shee.ipfs.w3s.link/nft-3.jpg";
  // (await myNFT.safeMint(deployer.address, nft3)).wait();
  // console.log("Nft 3 deployed");
  // let nft4 =
  //   "https://bafybeigv4l5vqktzdnvznin45koziveyyb7cjpgwjpujvj4i5cjorzyzvu.ipfs.w3s.link/nft-4.jpg";
  // (await myNFT.safeMint(deployer.address, nft4)).wait();
  // console.log("Nft 4 deployed");
  // let nft5 =
  //   "https://bafybeidqv7ve62ntwttunkjomwnn26z7xk5lxvt5mlyebky6u4v3p55u54.ipfs.w3s.link/nft-5.jpg";
  // (await myNFT.safeMint(deployer.address, nft5)).wait();
  // console.log("Nft 5 deployed");
  // let nft6 =
  //   "https://bafybeib2jzgm6age3brmwr5m756fyeqiksxcp5b6jmetb6anivnjbt5oga.ipfs.w3s.link/nft-6.jpg";
  // (await myNFT.safeMint(deployer.address, nft6)).wait();
  // console.log("Nft 6 deployed");

  // check all nfts
  // for (let i = 0; i < 6; i++) {
  //   let tokenURI = await myNFT.tokenURI(i);
  //   console.log(tokenURI);
  // }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
