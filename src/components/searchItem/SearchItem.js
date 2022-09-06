import React from "react";
import { Link } from "react-router-dom";
import "./searchItem.css";

const SearchItem = ({ item }) => {
  return (
    <>
      <div className="searchItem" key={item.key}>
        <div className="showTitle">
          <img src={item.image} alt="" className="siImg" />
          <div className="tipInfo">
            <span> Breakfast & dinner included</span>
          </div>
        </div>
        <div className="siDesc">
          <h1 className="siTitle">{item.name}</h1>
          <span className="siDistance">100K m from center</span>
          <span className="siTaxiOp">Free airport taxi</span>
          <span className="siSubtitle">{item.web}</span>
          <span className="siFeatures">any desc</span>
          <span className="siCancelOp">Free cancellation </span>
          <span className="siCancelOpSubtitle">{item.description}</span>
        </div>
        <div className="siDetails">
          {item.rate && (
            <div className="siRating">
              <span>Excellent</span>
              <button>{item.rate}</button>
            </div>
          )}
          <div className="siDetailTexts">
            <span className="siPrice">
              {`${item.min_room_price_details.total_price.name} / ${item.min_room_price_details.total_price.value} - ${item.currency} `}
            </span>
            <span className="siTaxOp">{item.address}</span>

            <button className="siCheckButton">See availability</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchItem;
