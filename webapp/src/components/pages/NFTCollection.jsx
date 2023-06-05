import React, { useEffect, useState } from "react";
import "../../css/nft-collection.css";
import Web3 from "web3";

import MyNFT from "../../contracts/MyNFT.json";
import Popup from "../layout/PopUp";

MyNFT.address = process.env.NFT_ADDRESS;

const NFTCollection = ({ account, connectMetamask }) => {
  const [activeCard, setActiveCard] = useState(null);
  const [NFTs, setNFTs] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [message, setMessage] = useState("This is a message");
  const [duration, setDuration] = useState();

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleClick = (id) => {
    setActiveCard(id === activeCard ? null : id);
  };

  const mintNFT = async (uri) => {
    setMessage(`Waiting for the transaction . . .`);
    handleOpenPopup();
    let web3 = new Web3(Web3.givenProvider);
    let nftCoin = new web3.eth.Contract(MyNFT.abi, MyNFT.address);

    let receipt = await nftCoin.methods
      .safeMint(account, uri)
      .send({ from: account });
    console.log(receipt);
    if (receipt) {
      handleClosePopup();
      setMessage("Thank you for the purchase!");
      setDuration(1000);
      handleOpenPopup();
    }
    let nfts = NFTs;
    for (let i = 0; i < nfts.length; i++) {
      if (nfts[i].uri === uri) {
        nfts[i].available = false;
      }
    }
    setNFTs(nfts);
  };

  async function loadNFTs() {
    let web3 = new Web3(Web3.givenProvider);
    let nftCoin = new web3.eth.Contract(MyNFT.abi, MyNFT.address);

    let nftURI;
    let nfts = [
      {
        id: 1,
        name: "NFT 1",
        uri: "https://bafybeibhifsub43cc2lxbyawugxglna23eyu57wucimomhkngd2kplntfu.ipfs.w3s.link/nft-1.jpg",
        desciption: "This is the 1st NFT",
        price: 0.0001,
        available: true,
      },
      {
        id: 2,
        name: "NFT 2",
        uri: "https://bafybeifmyv27tgkjtyxn767dc4375my2ylm7h3wr4yerdo7jssack25qq4.ipfs.w3s.link/nft-2.jpg",
        desciption: "This is the 2nd NFT",
        price: 0.0001,
        available: true,
      },
      {
        id: 3,
        name: "NFT 3",
        uri: "https://bafybeibcl644mzfc7revyntw5qozui2rtyhgsbl3xuxtsiqw5umu27shee.ipfs.w3s.link/nft-3.jpg",
        desciption: "This is the 3rd NFT",
        price: 0.0001,
        available: true,
      },
      {
        id: 4,
        name: "NFT 4",
        uri: "https://bafybeigv4l5vqktzdnvznin45koziveyyb7cjpgwjpujvj4i5cjorzyzvu.ipfs.w3s.link/nft-4.jpg",
        desciption: "This is the 4th NFT",
        price: 0.0001,
        available: true,
      },
      {
        id: 5,
        name: "NFT 5",
        uri: "https://bafybeidqv7ve62ntwttunkjomwnn26z7xk5lxvt5mlyebky6u4v3p55u54.ipfs.w3s.link/nft-5.jpg",
        desciption: "This is the 5th NFT",
        price: 0.0001,
        available: true,
      },
      {
        id: 6,
        name: "NFT 6",
        uri: "https://bafybeib2jzgm6age3brmwr5m756fyeqiksxcp5b6jmetb6anivnjbt5oga.ipfs.w3s.link/nft-6.jpg",
        desciption: "This is the 6th NFT",
        price: 0.0001,
        available: true,
      },
    ];

    // check if something is already owned
    if (account) {
      const balance = await nftCoin.methods.balanceOf(account).call();
      console.log(balance);
      const tokenIds = [];
      // get account nfts balance
      for (let i = 0; i < balance; i++) {
        const tokenId = await nftCoin.methods
          .tokenOfOwnerByIndex(account, i)
          .call();
        console.log(tokenId);
        tokenIds.push(tokenId);
      }
      let owner;
      let nftURI;
      let account_nfts = [];
      // get the account nft, id and uri
      for (let i = 0; i < tokenIds.length; i++) {
        owner = await nftCoin.methods.ownerOf(tokenIds[i]).call();
        console.log(owner);
        nftURI = await nftCoin.methods.tokenURI(i).call();
        account_nfts.push({ id: tokenIds[i], uri: nftURI });
      }
      // mark nfts owned with available = false
      for (let i = 0; i < nfts.length; i++) {
        try {
          owner = await nftCoin.methods.ownerOf(i).call();
          console.log(owner);
          nfts[i].available = false;
        } catch (error) {
          console.log(error);
        }
        for (let j = 0; j < account_nfts.length; j++) {
          console.log(nfts[i].uri === account_nfts[j].uri);
          if (nfts[i].uri === account_nfts[j].uri) {
            nfts[i].available = false;
          }
        }
      }
    } else {
      // check if anything is owned at all
      // mark nfts owned with available = false
      let owner;
      for (let i = 0; i < nfts.length; i++) {
        try {
          owner = await nftCoin.methods.ownerOf(i).call();
          console.log(owner);
          nfts[i].available = false;
        } catch (error) {
          console.log(error);
        }
      }
    }
    setNFTs(nfts);
  }

  useEffect(() => {
    loadNFTs();
  }, []);

  return (
    <>
      <Popup
        message={message}
        duration={duration}
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
      />
      <div className="nft-collection">
        <h1 className="nft-collection-title">NFT Collection</h1>
        <div className="nft-card-list">
          {NFTs.map((nft) => (
            <div
              key={nft.id}
              className={`nft-card ${nft.id === activeCard ? "active" : ""}`}
              onClick={() => handleClick(nft.id)}
            >
              <div className="nft-image">
                <img src={nft.uri} alt={nft.name} />
              </div>
              <div className="nft-details">
                <div className="nft-name">
                  <h2>{nft.name}</h2>
                  {nft.available && account ? (
                    <button
                      className="mint-button"
                      onClick={() => mintNFT(nft.uri)}
                    >
                      Mint
                    </button>
                  ) : account ? (
                    <div className="sold-out">Sold out</div>
                  ) : (
                    <button onClick={connectMetamask}>connect metamask</button>
                  )}
                </div>
                <div className="nft-description">{nft.description}</div>
                <div className="nft-price">{nft.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default NFTCollection;
