import React, { useState } from "react";
import "./hotel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocation } from "@fortawesome/free-solid-svg-icons";
import ImageGallery from "react-image-gallery";
import Maps from "./Maps";

const HotelDetails = ({ details }) => {
  const places = {
    lat: Number(details.latitude),
    lng: Number(details.longitude),
    id: 1,
  };

  const imagesRoom = details.images
    ?.map(({ image: thumbnail, ...rest }) => ({
      thumbnail,
      ...rest,
    }))
    ?.map((img) => {
      return {
        thumbnail: details.image_base_url.concat(img.thumbnail),
        original: details.image_base_url
          .concat(details.image_size.large)
          .concat(img.thumbnail),
      };
    });

  return (
    <div className="hotelContainer">
      <div className="hotelWrapper">
        <h1 className="hotelTitle">{details.name}</h1>
        <div className="hotelAddress">
          <FontAwesomeIcon icon={faLocation} />
          <span>{details.address}</span>
        </div>
        <a
          className="hotelWeb"
          href={`http://${details.web}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {details.web}
        </a>
        <span className="hotelPriceHighlight">{details.email}</span>

        <div className="firstContainer">
          {details.images?.length > 0 && (
            <ImageGallery items={imagesRoom} showIndex={true} />
          )}
          <div className="rightContent">
            <div className="hotelDetailsPrice">
              <h1>Perfect for a 9-night stay!</h1>
              <span>{details.address}</span>
              <h2>
                <b>$850</b> (9 nights)
              </h2>

              <button>Reserve or Book Now</button>
            </div>

            <div className="mapStyle">
              <Maps
                googleMapURL="https://maps.googleapis.com/maps/api/js?key="
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `200px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                center={places}
                zoom={4}
                places={places}
              />
            </div>
          </div>
        </div>

        <div className="hotelDetails">
          <div className="hotelDetailsTexts">
            <h1 className="hotelTitle">{details.name}</h1>
            <p className="hotelDesc">{details.description}</p>
          </div>
        </div>
      </div>
      {details.room_categories?.map((rom) => (
        <div className="roomWrapper">
          <h3>{rom.category_name}</h3>
        </div>
      ))}
    </div>
  );
};

export default HotelDetails;
