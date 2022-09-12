import React from "react";
import { Link } from "react-router-dom";
import Rating from "../rating/Rating";

import "./searchItem.css";

const SearchItem = ({ item }) => {
  return (
    <>
      <div className="searchItem" key={item.key}>
        <div className="showTitle">
          <img src={item.image} alt="" className="siImg" />
          {item.min_room.room_board.code !== "RO" && (
            <div className="tipInfo">
              <span> {item.min_room.room_board.name}</span>
            </div>
          )}
        </div>
        <div className="siDesc">
          <Link
            to={`/hotels/${item.key}`}
            state={{ key: item.key, hotel_code: item.code }}
          >
            <h1 className="siTitle">{item.name}</h1>
          </Link>

          <Rating rating={item.rate} />
          <span className="siDistance">{item.address}</span>
          <span className="siTaxiOp">{item.hotel_category.name}</span>
          {/* <span className="siSubtitle">{item.web}</span> */}
          <span className="siFeatures">{item.hotel_chain.description}</span>
          {/* <span className="siCancelOp">
            {item.min_room.room_cancellation_policies[0].amount !== "" &&
              "FREE cancellation"}
          </span> */}
          <Link
            to={`/hotels/${item.key}`}
            state={{ key: item.key, hotel_code: item.code }}
          >
            <span className="siCancelOpSubtitle">
              {item.description?.substring(0, 150)}...
            </span>
          </Link>
        </div>
        <div className="siDetails">
          {item.rate && (
            <div className="siRank">
              <span>{item.hotel_rank.name}</span>
              <button>{item.hotel_rank.value}</button>
            </div>
          )}
          <div className="siDetailTexts">
            <span className="siPrice">
              {item.currency === "USD" && "$"}
              {item.min_room.room_price_details.total_price.value.toFixed(1)}
            </span>
            {/* <span className="siTaxOp">{item.currency === "USD" && "$"}{item.max_room_price_details.total_price.value.toFixed(1)} total</span> */}
            <Link
              to={`/hotels/${item.key}`}
              state={{ key: item.key, hotel_code: item.code }}
            >
              <button className="siCheckButton">See availability</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchItem;
