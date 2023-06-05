import React, { useEffect, useState } from "react";
import Web3 from "web3";
import moment from "moment";
import "../../css/crowdsale.css";

import TOKEN_SALE from "../../contracts/Crowdsale.json";
import CROWDSALE from "../../contracts/Crowdsale.json";
import TOKEN from "../../contracts/MyToken.json";
import Popup from "../layout/PopUp";

CROWDSALE.address = process.env.CROWDSALE_ADDRESS;
TOKEN.address = process.env.TOKEN_ADDRESS;

function Crowdsale({ account, networkId }) {
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(0);
  const [ETHbalance, setETHBalance] = useState(0);
  const [totAmount, setTotAmount] = useState(0);
  const [amountRemaining, setAmountRemaining] = useState(0);
  const [price, setPrice] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [message, setMessage] = useState("This is a message");
  const [duration, setDuration] = useState();

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleInputChange = (e) => {
    setAmount(e.target.value);
  };

  const handleBuyClick = async () => {
    setMessage(`Waiting for the transaction . . .`);
    handleOpenPopup();
    try {
      // Handle buy logic here
      console.log(`Buy ${amount} tokens`);
      // await approve();
      await buyTokens();
    } catch (error) {
      console.log(error);
    }
  };

  const buyTokens = async () => {
    let web3 = new Web3(Web3.givenProvider);
    let token = new web3.eth.Contract(TOKEN.abi, TOKEN.address);
    let crowdsale = new web3.eth.Contract(CROWDSALE.abi, CROWDSALE.address);
    let price = await crowdsale.methods.price().call();
    let p = web3.utils.fromWei(price, "ether");
    console.log(price);
    console.log(p);
    let a = web3.utils.toWei(amount, "ether");
    console.log(a);
    let v = amount * p;
    let value = web3.utils.toWei(v.toString(), "ether");
    console.log(value);
    console.log(web3.utils.fromWei(value, "ether"));
    let receipt = await crowdsale.methods.buyTokens().send({
      from: account,
      value,
    });
    console.log(receipt);
    if (receipt) {
      handleClosePopup();
      setMessage("Thank you for the purchase!");
      setDuration(1000);
      handleOpenPopup();
    }
    updateBalances();
  };

  const approve = async () => {
    let web3 = new Web3(Web3.givenProvider);
    let token = new web3.eth.Contract(TOKEN.abi, TOKEN.address);
    let a = web3.utils.toWei(amount, "ether");
    console.log(a);
    let approve_receipt = await token.methods
      .approve(CROWDSALE.address, a)
      .send({
        from: account,
      });
    console.log(approve_receipt);
  };

  async function updateBalances() {
    let web3 = new Web3(Web3.givenProvider);
    let token = new web3.eth.Contract(TOKEN.abi, TOKEN.address);
    if (account) {
      let balance = await token.methods.balanceOf(account).call();
      setBalance(web3.utils.fromWei(balance, "ether"));

      let eth_balance = await web3.eth.getBalance(account);
      setETHBalance(web3.utils.fromWei(eth_balance, "ether"));

      let amountRemaining = await token.methods
        .balanceOf(TOKEN_SALE.address)
        .call();
      setAmountRemaining(web3.utils.fromWei(amountRemaining, "ether"));
    }
  }

  async function loadContracts(networkId) {
    let web3 = new Web3(Web3.givenProvider);
    let token = new web3.eth.Contract(TOKEN.abi, TOKEN.address);
    let balance;
    if (account) {
      balance = await token.methods.balanceOf(account).call();
      setBalance(web3.utils.fromWei(balance, "ether"));

      let eth_balance = await web3.eth.getBalance(account);
      setETHBalance(web3.utils.fromWei(eth_balance, "ether"));

      let totAmount = await token.methods.balanceOf(TOKEN_SALE.address).call();
      // let totSupply = await token.methods.totSupply().call();
      // console.log(`Total supply: ${totSupply}`);
      console.log(totAmount);
      setTotAmount(web3.utils.fromWei(totAmount, "ether"));
      setAmountRemaining(web3.utils.fromWei(totAmount, "ether"));
    }

    let crowdsale = new web3.eth.Contract(CROWDSALE.abi, CROWDSALE.address);
    let price = await crowdsale.methods.price().call();
    let p = web3.utils.fromWei(price, "ether");
    setPrice(p);
  }

  function formatNumber(number) {
    const formattedNumber = Number(number).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 20, // Adjust this value as per your requirement
    });

    return formattedNumber
      .replace(/(\.\d*?[1-9])0+$/g, "$1")
      .replace(/\.$/, "");
  }

  useEffect(() => {
    loadContracts(networkId);
  }, []);

  return (
    <div className="crowdsale">
      <div className="crowdsale-card">
        <h2 className="crowdsale-title">Welcome to the Token Sale</h2>
        <div className="crowdsale-details">
          <p>Price: {formatNumber(price)} ETH</p>
          <p>ETH balance: {ETHbalance}</p>
          <p>Token balance: {formatNumber(balance)}</p>
          <p>Tokens amount left: {formatNumber(totAmount)}</p>
        </div>
        <div className="crowdsale-form">
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={handleInputChange}
            className="crowdsale-input"
          />
          <> = {amount * price} ETH</>
          <button onClick={handleBuyClick} className="crowdsale-button">
            Buy Tokens
          </button>
          <Popup
            message={message}
            duration={duration}
            isOpen={isPopupOpen}
            onClose={handleClosePopup}
          />
        </div>
      </div>
    </div>
  );
}

export default Crowdsale;
