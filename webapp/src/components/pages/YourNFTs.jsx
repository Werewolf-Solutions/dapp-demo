import React, { useEffect, useState } from "react";
import "../../css/your-nfts.css";
import Web3 from "web3";

import MyNFT from "../../contracts/MyNFT.json";

MyNFT.address = process.env.NFT_ADDRESS;

export default function YourNFTs({ account }) {
  const [activeCard, setActiveCard] = useState(null);
  const [NFTs, setNFTs] = useState([]);

  const handleClick = (id) => {
    setActiveCard(id === activeCard ? null : id);
  };

  async function loadNFTs() {
    let web3 = new Web3(Web3.givenProvider);
    let nftCoin = new web3.eth.Contract(MyNFT.abi, MyNFT.address);

    if (account) {
      const balance = await nftCoin.methods.balanceOf(account).call();
      const tokenIds = [];
      for (let i = 0; i < balance; i++) {
        const tokenId = await nftCoin.methods
          .tokenOfOwnerByIndex(account, i)
          .call();
        tokenIds.push(tokenId);
      }
      let owner;
      let nftURI;
      let nfts = [];
      for (let i = 0; i < tokenIds.length; i++) {
        owner = await nftCoin.methods.ownerOf(tokenIds[i]).call();
        if (owner === account) {
          nftURI = await nftCoin.methods.tokenURI(i).call();
          nfts.push({ id: tokenIds[i], uri: nftURI });
        }
      }
      setNFTs(nfts);
    }
  }

  useEffect(() => {
    loadNFTs();
  }, []);

  return (
    <div className="your-nfts">
      <h1>Your NFTs</h1>
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
              <h2>{nft.name}</h2>
              <div className="nft-description">{nft.description}</div>
              <div className="nft-price">{nft.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
