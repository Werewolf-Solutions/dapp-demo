// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./MyToken.sol";

contract Crowdsale {
    address public owner;
    MyToken public token;
    uint256 public tokenPrice;
    uint256 public startTime;
    uint256 public endTime;
    uint256 public tokensSold;

    event TokensPurchased(address buyer, uint256 amount, uint256 totalPrice);

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Only the contract owner can perform this action"
        );
        _;
    }

    constructor(
        MyToken _token,
        uint256 _tokenPrice,
        uint256 _startTime,
        uint256 _endTime
    ) {
        owner = msg.sender;
        token = _token;
        tokenPrice = _tokenPrice;
        startTime = _startTime;
        endTime = _endTime;
    }

    function buyTokens() external payable {
        require(
            block.timestamp >= startTime && block.timestamp <= endTime,
            "Crowdsale is not active"
        );
        require(
            msg.value > 0,
            "Invalid amount. You must send Ether to purchase tokens"
        );

        uint256 tokenAmount = (msg.value * 10 ** 18) / tokenPrice; // Assuming token has 18 decimals
        require(
            token.balanceOf(address(this)) >= tokenAmount,
            "Insufficient tokens available for sale"
        );

        token.transfer(msg.sender, tokenAmount);
        tokensSold += tokenAmount;

        emit TokensPurchased(msg.sender, tokenAmount, msg.value);
    }

    function withdrawEther() external onlyOwner {
        require(block.timestamp > endTime, "Crowdsale has not ended yet");

        uint256 balance = address(this).balance;
        require(balance > 0, "No Ether to withdraw");

        payable(owner).transfer(balance);
    }

    function setTokenPrice(uint256 _tokenPrice) external onlyOwner {
        tokenPrice = _tokenPrice;
    }

    function price() external view returns (uint256 _price) {
        return tokenPrice;
    }

    function startTimestamp() external view returns (uint256 _startTime) {
        return startTime;
    }

    function endTimestamp() external view returns (uint256 _endTime) {
        return endTime;
    }
}
