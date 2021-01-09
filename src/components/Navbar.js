import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";

import { useSelector } from "react-redux";

function Navbar() {
  const [show, handleShow] = useState(false);
  const state = useSelector((state) => state.money.currentMoney);

  const getPrice = (price) => {
    let str_price = price.toString().split("").reverse().join("");
    let str_price_idr = "";
    let counter = 1;
    let len = str_price.length;
    for (let char in str_price) {
      str_price_idr += str_price[char];
      if (counter === 3 && char !== len - 1) {
        counter = 0;
        str_price_idr += ".";
      }
      counter++;
    }
    return str_price_idr.split("").reverse().join("");
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
  }, []);

  return (
    <div className={`nav ${show && "nav-black"}`}>
      <Link className="nav-brand" to="/">
        StreamFlix
      </Link>
      <div className="nav-right">
        <div className="nav-div-money">
          <img
            src={process.env.PUBLIC_URL + "/coin-orange.png"}
            alt="Coin Logo"
            className="nav-coin-logo"
          />
          <span className="nav-money">{getPrice(state)}</span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
