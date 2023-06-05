import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Web3 from "web3";
import "./App.css";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/pages/Home";
import Crowdsale from "./components/pages/Crowdsale";
import NFTCollection from "./components/pages/NFTCollection";
import YourNFTs from "./components/pages/YourNFTs";

function App() {
  const [account, setAccount] = useState();
  const [balance, setBalance] = useState();
  const [tokenBalance, setTokenBalance] = useState();
  const [networkId, setNetworkId] = useState();
  const [web3, setWeb3] = useState();
  const [tokenContract, setTokenContract] = useState();
  const [token, setToken] = useState({});
  const [theme, setTheme] = useState("green");

  const connectMetamask = async () => {
    console.log("clicked");
    if (typeof window.ethereum !== "undefined") {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      let web3 = new Web3(Web3.givenProvider);
      setWeb3(web3);
      let account = await web3.eth.getAccounts();
      let bal = await web3.eth.getBalance(account[0]);
      let balance = web3.utils.fromWei(bal);
      let networkId = await web3.eth.net.getId();
      setAccount(account[0]);
      setBalance(balance);
      setNetworkId(networkId);
      window.ethereum.on("accountsChanged", async (accounts) => {
        // Handle the new accounts, or lack thereof.
        // "accounts" will always be an array, but it can be empty.
        setAccount(accounts[0]);
        let bal = await web3.eth.getBalance(accounts[0]);
        let balance = web3.utils.fromWei(bal);
        let networkId = await web3.eth.net.getId();
        setBalance(balance);
        setNetworkId(networkId);
      });

      window.ethereum.on("chainChanged", (chainId) => {
        // Handle the new chain.
        // Correctly handling chain changes can be complicated.
        // We recommend reloading the page unless you have good reason not to.
        window.location.reload();
      });
      // window.ethereum.removeListener("accountsChanged", () =>
      //   console.log("stop listening")
      // );
    }
  };

  const handleTheme = () => {
    const newTheme =
      theme === "dark" ? "green" : theme === "green" ? "light" : "dark";
    setTheme(newTheme);
  };

  return (
    <Router>
      <div className={`app ${theme}`}>
        <Header
          handleTheme={handleTheme}
          connectMetamask={connectMetamask}
          account={account}
        />
        <div className="bg-img-container"></div>
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/token-sale"
              element={<Crowdsale networkId={networkId} account={account} />}
            />
            <Route
              path="/nft-collection"
              element={
                <NFTCollection
                  account={account}
                  connectMetamask={connectMetamask}
                />
              }
            />
            <Route path="/your-nfts" element={<YourNFTs account={account} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
