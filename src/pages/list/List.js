import axios from "axios";
import { format } from "date-fns";
import React, { useState, useEffect } from "react";
import { DateRange } from "react-date-range";
import { useLocation } from "react-router-dom";
import { Navbar, Header, SearchItem } from "../../components";
import instance from "../../hooks/endPoint";
import useFetch from "../../hooks/useFetch";
import "./list.css";
function List() {
  const location = useLocation();

  const [openDate, setOpenDate] = useState(false);
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [options, setOptions] = useState(location.state.options);

  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  var startDate = date[0].startDate.toISOString().split("T")[0];
  var endDate = date[0].endDate.toISOString().split("T")[0];

  let myData = {
    check_in: startDate,
    check_out: endDate,
    suppliers: [
      {
        id: 2,
        name: "Hotelbeds",
      },
    ],
    rooms: [
      {
        adult_no: 1,
        child_age: [],
      },
    ],
    location: {
      code: 177,
      name: "Ohtels Villa Dorada",
      type: "city",
    },
  };

  useEffect(() => {
    const getHotelSearch = async () => {
      try {
        const { data } = await instance.post("hotel/search", myData, {
          headers: {
            "Accept-Language": "ar",
            "Search-Currency": "USD",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      } catch (err) {
        console.log(err);
      }
    };
    getHotelSearch();
  }, []);
  console.log(
    "the date....",
    startDate.split("/").join("-"),
    endDate.split("/").join("-")
  );
  return (
    <div>
      {/* <Navbar /> */}
      <Header type="List" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input placeholder={destination} type="text" />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span
                onClick={() => {
                  setOpenDate(!openDate);
                  // setOpenOptions(false);
                }}
              >{`${format(date[0].startDate, "yyyy/MM/dd")} to ${format(
                date[0].endDate,
                "yyyy/MM/dd"
              )}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  ranges={date}
                  minDate={new Date()}
                />
              )}
            </div>

            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    min price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    className="lsOptionInput"
                    onChange={(e) => setMin(e.target.value)}
                  />
                </div>

                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    className="lsOptionInput"
                    onChange={(e) => setMax(e.target.value)}
                  />
                </div>

                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.adult}
                  />
                </div>

                <div className="lsOptionItem">
                  <span className="lsOptionText">children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={options.children}
                  />
                </div>

                <div className="lsOptionItem">
                  <span className="lsOptionText">room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            <button>Search</button>
          </div>
          {/* <div className="listResult">
            {loading ? (
              <span className="load">Loading</span>
            ) : (
              <>
                {data.data.map((item) => {
                  <SearchItem item={item} key={item.id} />;
                })}
              </>
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default List;
