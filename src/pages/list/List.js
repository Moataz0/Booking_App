import { format } from "date-fns";
import React, { useState, useEffect } from "react";
import { DateRange } from "react-date-range";
import { useLocation } from "react-router-dom";
import { Navbar, Header, SearchItem } from "../../components";
import axios from "../../hooks/endPoint";
import "./list.css";
function List() {
  const location = useLocation();
  const [openDate, setOpenDate] = useState(false);
  const [destination, setDestination] = useState(
    location.state.searchResult.data[0]
  );
  const [getAges, setGetAges] = useState(location.state.updateAges);
  const [date, setDate] = useState(location.state.date);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [resData, setResData] = useState([]);

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [year, month, day].join("/");
  }

  console.log("options", options[0]);
  var arrChildAges = getAges.map(Number);

  let myData = {
    check_in: formatDate(date[0].startDate),
    check_out: formatDate(date[0].endDate),
    suppliers: [
      {
        id: 2,
        name: "Hotelbeds",
      },
    ],
    rooms: [
      {
        adult_no: options[0].adult_no,
        child_age: arrChildAges,
      },
    ],
    location: destination,
  };

  console.log("OPTION");
  useEffect(() => {
    setLoading(true);
    const getSearchHotels = async () => {
      try {
        const { data } = await axios.post("hotel/search", myData, {
          headers: {
            "Accept-Language": "ar",
            "Search-Currency": "USD",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log("Data sent", myData);

        // setResData(data[0].data);
        console.log("Res data.....", data.data);
        console.log(" data.....", data.data);
        setResData(data.data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    getSearchHotels();
  }, []);

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
              <input placeholder={destination.name} type="text" />
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
            {options.map((room) => (
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
                      placeholder={room.adult_no}
                    />
                  </div>

                  <div className="lsOptionItem">
                    <span className="lsOptionText">children</span>
                    <input
                      type="number"
                      min={0}
                      className="lsOptionInput"
                      placeholder={room.children}
                    />
                  </div>

                  <div className="lsOptionItem">
                    <span className="lsOptionText">room</span>
                    <input
                      type="number"
                      min={1}
                      className="lsOptionInput"
                      placeholder={room.room}
                    />
                  </div>
                </div>
              </div>
            ))}

            <button>Search</button>
          </div>
          <div className="listResult">
            {loading ? (
              <span className="loader"></span>
            ) : (
              <>
                {resData.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;
