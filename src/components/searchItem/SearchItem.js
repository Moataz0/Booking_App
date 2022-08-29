import React from "react";
import { Link } from "react-router-dom";
import "./searchItem.css";

const SearchItem = () => {
  return (
    <>
      <div className="searchItem">
        <div className="showTitle">
          <img
            src="https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg"
            alt=""
            className="siImg"
          />
          <div className="tipInfo">
            <span> Breakfast & dinner included</span>
          </div>
        </div>
        <div className="siDesc">
          <h1 className="siTitle">test country</h1>
          <span className="siDistance">100K m from center</span>
          <span className="siTaxiOp">Free airport taxi</span>
          <span className="siSubtitle">
            Studio Apartment with Air conditioning
          </span>
          <span className="siFeatures">any desc</span>
          <span className="siCancelOp">Free cancellation </span>
          <span className="siCancelOpSubtitle">
            You can cancel later, so lock in this great price today!
          </span>
        </div>
        <div className="siDetails">
          <div className="siRating">
            <span>Excellent</span>
            <button>3</button>
          </div>
          <div className="siDetailTexts">
            <span className="siPrice">$10</span>
            <span className="siTaxOp">Includes taxes and fees</span>

            <button className="siCheckButton">See availability</button>
          </div>
        </div>
      </div>

      <div className="searchItem">
        <div className="showTitle">
          <img
            src="https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg"
            alt=""
            className="siImg"
          />
          <div className="tipInfo">
            <span> Breakfast & dinner</span>
          </div>
        </div>
        <div className="siDesc">
          <h1 className="siTitle">test country</h1>
          <span className="siDistance">100K m from center</span>
          <span className="siTaxiOp">Free airport taxi</span>
          <span className="siSubtitle">
            Studio Apartment with Air conditioning
          </span>
          <span className="siFeatures">any desc</span>
          <span className="siCancelOp">Free cancellation </span>
          <span className="siCancelOpSubtitle">
            You can cancel later, so lock in this great price today!
          </span>
        </div>
        <div className="siDetails">
          <div className="siRating">
            <span>Excellent</span>
            <button>3</button>
          </div>
          <div className="siDetailTexts">
            <span className="siPrice">$10</span>
            <span className="siTaxOp">Includes taxes and fees</span>

            <button className="siCheckButton">See availability</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchItem;
