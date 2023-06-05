import React from "react";
import { Link } from "react-router-dom";
import "../../css/home.css";

function Home() {
  return (
    <div className="home">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to this Dapp Demo</h1>
          <div className="hero-description">
            <p>
              This demo works on Sepolia network and it's meant to show a few
              simple functionalities of a decentralized app.
            </p>
            <p>
              Please feel free to help us, join
              <a href="https://discord.gg/tdfE7r7n">Discord</a> or
              <a href="https://t.me/+IgwxaWzM-U9kUsG_">Telegram</a> to write any
              suggestion. If you are a dev please have a look at
              <a href="https://github.com/Werewolf-Solutions/demo-dapp">
                Github
              </a>
              .
            </p>
          </div>
        </div>
        <div className="button-section">
          <Link to="/token-sale">
            <button className="nav-button">Buy tokens from Token Sale</button>
          </Link>
          <Link to="/nft-collection">
            <button className="nav-button">
              Mint NFTs from our NFT Collection
            </button>
          </Link>
          <Link to="/nft-collection">
            <button className="nav-button">View the NFTs you minted</button>
          </Link>
        </div>
      </div>
      {/* <div className="about-section">
        <div className="about-content">
          <div className="about-card">
            <div className="about-image-container">
              <img src={aboutImage} alt="About Us" className="about-image" />
            </div>
            <div className="about-text">
              <h2 className="about-title">About Us</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                aliquam eros et magna dignissim, id efficitur ex commodo.
                Integer volutpat nisi ac purus placerat volutpat. Suspendisse et
                ipsum leo.
              </p>
              <p>
                Sed pretium gravida mauris, sit amet semper nulla cursus id.
                Integer consequat quam vel mauris accumsan rutrum. Mauris eu
                tortor semper, bibendum sem ut, lacinia est.
              </p>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default Home;
