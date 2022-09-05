import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar({ nameCompany, currencies,languages }) {
  return (
    <div className="container">
      <div className="row navbar">
        <div className="navContainer">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="logo">{nameCompany}</span>
          </Link>

          <div className="navItems">
            <span>Currencies </span>
            <select className="selectAge" name="currencies" id="currencies">
              {currencies.map((curr, index) => (
                <option value={curr.alias} key={index}>
                  {curr.alias}
                </option>
              ))}
            </select>
            <span>Language: </span>
            <select className="selectAge" name="currencies" id="currencies">
              {languages.map((lang, index) => (
                <option value={lang.alias} key={index}>
                  {lang.alias}
                </option>
              ))}
            </select>
            <button className="navButton">Register</button>
            <button className="navButton">Login</button>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
