import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import "../../css/header.css";

const Header = ({ connectMetamask, account, handleTheme }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  function formatString(str) {
    if (str.length <= 6) {
      return str; // No need for formatting if the string length is less than or equal to 6
    }

    const firstThree = str.slice(0, 3);
    const lastThree = str.slice(-3);

    return `${firstThree}...${lastThree}`;
  }

  return (
    <header>
      <nav className="navbar">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
          <h1 className="logo-text">Demo Dapp</h1>
        </div>

        <div className={`nav-links ${menuOpen ? "overlay" : ""}`}>
          <ul className={`nav-links ${menuOpen ? "show" : ""}`}>
            <div
              className={`menu-burger ${menuOpen ? "open" : ""}`}
              onClick={toggleMenu}
            >
              <div className={`bar ${menuOpen ? "open" : ""}`}></div>
              <div className={`bar ${menuOpen ? "open" : ""}`}></div>
              <div className={`bar ${menuOpen ? "open" : ""}`}></div>
            </div>
            <NavLink exact to="/" className="nav-link" activeClassName="active">
              Home
            </NavLink>
            <NavLink
              to="/token-sale"
              className="nav-link"
              activeClassName="active"
            >
              Token Sale Page
            </NavLink>
            <NavLink
              to="/nft-collection"
              className="nav-link"
              activeClassName="active"
            >
              NFT Collection
            </NavLink>
            <NavLink
              to="/your-nfts"
              className="nav-link"
              activeClassName="active"
            >
              Your NFTs
            </NavLink>
            <div>
              {account ? (
                formatString(account)
              ) : (
                <a className="connect-button" onClick={connectMetamask}>
                  Connect Metamask
                </a>
              )}
            </div>

            <a id="toggle-theme" className="toggle-theme" onClick={handleTheme}>
              Toggle Theme
            </a>
          </ul>
        </div>
        <div
          className={`menu-burger ${menuOpen ? "open" : "close"}`}
          onClick={toggleMenu}
        >
          <div className={`bar ${menuOpen ? "open" : ""}`}></div>
          <div className={`bar ${menuOpen ? "open" : ""}`}></div>
          <div className={`bar ${menuOpen ? "open" : ""}`}></div>
        </div>
      </nav>
      {/* {menuOpen && (
        <div className="mobile">
          <ul>
            <li>
              <NavLink
                exact
                to="/"
                className="nav-link"
                activeClassName="active"
                onClick={toggleMenu}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/token-sale"
                className="nav-link"
                activeClassName="active"
                onClick={toggleMenu}
              >
                Token Sale Page
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/nft-collection"
                className="nav-link"
                activeClassName="active"
                onClick={toggleMenu}
              >
                NFT Collection
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/your-nfts"
                className="nav-link"
                activeClassName="active"
                onClick={toggleMenu}
              >
                Your NFTs
              </NavLink>
            </li>
          </ul>
        </div>
      )} */}
    </header>
  );
};

export default Header;
