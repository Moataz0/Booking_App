import React, { useState } from "react";
import "./hotel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocation,
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import ImageGallery from "react-image-gallery";

const HotelDetails = ({ details }) => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const photos = [
    {
      id: 1,
      src: "https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/263783778.jpg?k=611c28a1fc122e066d3f13734226cf33ee87aa28f53c9065ad04ec286db13cd1&o=&hp=1",
    },
    {
      id: 2,
      src: "https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/263783774.jpg?k=0f1a7de5da745ec2aeccbb8e399004dc3a8eab18505cd49b13bc0d9d8e6cf9a6&o=&hp=1",
    },
    {
      id: 3,
      src: "https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/38593752.jpg?k=a90d1074ceaee62441e1f8a43939870608e714413ab9b6c2f65836968c204111&o=&hp=1",
    },
    {
      id: 4,
      src: "https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/263783782.jpg?k=4c1bfbb4afc6b1b38a7c2f10df60edd57bfc55ef67cfde1209760dbfc5d94879&o=&hp=1",
    },
    {
      id: 5,
      src: "https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/263783793.jpg?k=d90f6481725e5324595b3d6fc8518d2f3441ccdb5c2fb1f7252469bdc93347a3&o=&hp=1",
    },
    {
      id: 6,
      src: "https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/306268405.jpg?k=97b0805f6e85af01f8ee44dbe43680d4548849d95fac3d6f40f29ad45f9972e3&o=&hp=1",
    },
    {
      id: 7,
      src: "https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/263783788.jpg?k=a50253d89b22f0b18b262ac154262a406a53537132a59892d6971ac43ca46364&o=&hp=1",
    },
  ];
  // open slider
  const handleSlider = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const images = [
    {
      original: "https://picsum.photos/id/1018/1000/600/",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      original: "https://picsum.photos/id/1015/1000/600/",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      original: "https://picsum.photos/id/1019/1000/600/",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
  ];
  // Handle slider move
  const handleArrows = (direction = 1) => {
    let newSlideNumber = 0;
    if (slideNumber + direction < 0) {
      newSlideNumber = details.images.length - 1;
    } else {
      newSlideNumber = (slideNumber + direction) % details.images.length;
    }
    setSlideNumber(newSlideNumber);
  };
  let imgs = details?.image_base_url + images.map((img) => ({ img }));
  console.log(imgs);
  return (
    <div className="hotelContainer">
      {/* {open && (
        <div className="slider">
          <FontAwesomeIcon
            icon={faCircleXmark}
            className="close"
            onClick={() => setOpen(false)}
          />
          <FontAwesomeIcon
            icon={faCircleArrowLeft}
            className="arrow"
            onClick={() => handleArrows(-1)}
          />
          
          <div className="sliderWrapper">
          <ReactImageGallery items={photos} />
          </div>
          <FontAwesomeIcon
            icon={faCircleArrowRight}
            className="arrow"
            onClick={() => handleArrows(1)}
          />
        </div>
      )} */}
      <div className="hotelWrapper">
        <button className="bookNow">Reserve or Book Now!</button>
        <h1 className="hotelTitle">{details.name}</h1>
        <div className="hotelAddress">
          <FontAwesomeIcon icon={faLocation} />
          <span>{details.address}</span>
        </div>
        <span className="hotelDistance">
          Excellent location - 500m from center
        </span>
        <span className="hotelPriceHighlight">
          Book a stay over $114 at this property and get a free airport taxi
        </span>
        {/* <div className="hotelImages">
          {details?.images?.map((image, i) => (
            <div className="hotelImgWrapper" key={i}>
              <img
                onClick={() => handleSlider(i)}
                src={details.image_base_url + image}
                alt=""
                className="hotelImg"
              />
            </div>
          ))}
        </div> */}

        {/* <ImageGallery items={imgs} /> */}
        <div className="hotelDetails">
          <div className="hotelDetailsTexts">
            <h1 className="hotelTitle">{details.name}</h1>
            <p className="hotelDesc">{details.description}</p>
          </div>
          <div className="hotelDetailsPrice">
            <h1>Perfect for a 9-night stay!</h1>
            <span>{details.address}</span>
            <h2>
              <b>$850</b> (9 nights)
            </h2>
            <button>Reserve or Book Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;
