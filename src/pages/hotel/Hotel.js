import React, { useEffect, useState } from "react";
import "./hotel.css";
import { Header, MailList, Footer } from "../../components";

import axios from "../../hooks/endPoint";
import { useLocation } from "react-router-dom";
import HotelDetails from "./HotelDetails";

function Hotel() {
  const [loading, setLoading] = useState(false);
  const [roomDetails, setRoomDetails] = useState([]);

  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const getSearchHotels = async () => {
      try {
        const { data } = await axios.post("hotel/get_rooms", location.state, {
          headers: {
            "Accept-Language": "ar",
            "Search-Currency": "USD",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        console.log(" data room.....", data);
        // setResData(data.data);
        setRoomDetails(data.data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    getSearchHotels();
  }, []);

  return (
    <>
      {/* <Navbar /> */}
      <Header type="List" />
      {loading ? (
        <span className="loader"></span>
      ) : (
        <HotelDetails details={roomDetails} />
      )}
      <MailList />
      {/* <Footer /> */}
    </>
  );
}

export default Hotel;
