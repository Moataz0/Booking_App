import React, { useState } from "react";
import "./hotel.css";
import { Navbar, Header, MailList, Footer } from "../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocation,
} from "@fortawesome/free-solid-svg-icons";

function Hotel() {
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
  // Handle slider move
  const handleArrows = (direction = 1) => {
    let newSlideNumber = 0;
    if (slideNumber + direction < 0) {
      newSlideNumber = photos.length - 1;
    } else {
      newSlideNumber = (slideNumber + direction) % photos.length;
    }
    setSlideNumber(newSlideNumber);
  };
  return (
    <div>
      <Navbar />
      <Header type="List" />
      <div className="hotelContainer">
        {open && (
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
              <img
                src={photos[slideNumber].src}
                alt=""
                className="sliderImage"
              />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleArrows(1)}
            />
          </div>
        )}
        <div className="hotelWrapper">
          <button className="bookNow">Reserve or Book Now!</button>
          <h1 className="hotelTitle">Grand Hotel</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocation} />
            <span>Elton St 125 New york</span>
          </div>
          <span className="hotelDistance">
            Excellent location - 500m from center
          </span>
          <span className="hotelPriceHighlight">
            Book a stay over $114 at this property and get a free airport taxi
          </span>
          <div className="hotelImages">
            {photos.map((image, i) => (
              <div className="hotelImgWrapper" key={image.id}>
                <img
                  onClick={() => handleSlider(i)}
                  src={image.src}
                  alt=""
                  className="hotelImg"
                />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">Stay in the heart of london</h1>
              <p className="hotelDesc">
                Ea nulla officia velit irure consequat quis enim est. Ad
                exercitation elit culpa proident cupidatat ut ea ut fugiat
                eiusmod. Dolor exercitation quis dolor deserunt incididunt nulla
                dolore reprehenderit aliqua mollit tempor laboris. Incididunt
                elit quis esse laboris aute incididunt sunt id veniam tempor.
                Exercitation adipisicing officia nostrud proident fugiat ex
                excepteur occaecat adipisicing. Labore commodo labore commodo
                aliqua duis ea voluptate nisi velit. Incididunt eu culpa commodo
                anim nisi aliqua occaecat veniam non irure sunt eu commodo.
                Excepteur fugiat commodo tempor Lorem mollit sint deserunt id.
                Do occaecat fugiat esse nostrud excepteur commodo et id Lorem
                culpa adipisicing. Laboris reprehenderit in aute ullamco nulla.
                Magna aliqua laboris cupidatat est eiusmod ex irure. Ut velit
                quis laboris labore fugiat ea ut occaecat incididunt aute sint
                esse laborum commodo. Sit ullamco mollit anim proident dolor
                veniam aliqua deserunt laboris consequat reprehenderit eiusmod
                sunt. Exercitation in est minim cupidatat ad dolor et enim
                pariatur laboris ea velit ullamco veniam. Sit exercitation
                proident anim quis aute deserunt. Excepteur exercitation ex ad
                sint sint cupidatat eiusmod est tempor occaecat amet sit ea
                aliquip.
              </p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for a 9-night stay!</h1>
              <span>
                Tempor elit velit incididunt exercitation sit velit proident sit
                ex irure sunt ea.
              </span>
              <h2>
                <b>$850</b> (9 nights)
              </h2>
              <button>Reserve or Book Now</button>
            </div>
          </div>
        </div>
        <MailList />
        <Footer />
      </div>
    </div>
  );
}

export default Hotel;
