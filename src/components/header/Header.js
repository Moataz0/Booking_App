import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faCalendarDays,
  faCar,
  faHotel,
  faLocationDot,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import "./header.css";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useNavigate } from "react-router-dom";
import axios from "../../hooks/endPoint";
import NewRoom from "../newRoom/NewRoom";

const Header = ({ type }) => {
  const [destination, setDistination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [loadingResult, setloadingResult] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [childrenAge, setChildrenAge] = useState([{ age: "" }]);
  const [options, setOptions] = useState([
    {
      adult: 1,
      children: 0,
      room: 1,
    },
  ]);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const navigate = useNavigate();

  const [openOptions, setOpenOptions] = useState(false);

  const handleRemoveChildrenAge = (index) => {
    const list = [...childrenAge];
    list.splice(index, 1);
    setChildrenAge(list);
  };

  const handleChildrenAgeAdd = (index) => {
    setChildrenAge([...childrenAge, { age: "" }]);
    let concat = [...childrenAge.concat(options)];
    console.log("Options", concat);
  };

  const addNewRoom = () => {
    let newRoom = { adult: 1, children: 0 };
    setOptions([...options, newRoom]);
  };

  const removeRoom = (index) => {
    let data = [...options];
    data.splice(index, 1);
    setOptions(data);
  };

  let agesArr = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const handleGetPlaces = (e) => {
    let typing = e.target.value;
    setDistination(typing);
  };
  useEffect(() => {
    const getData = async () => {
      if (destination.length >= 3) {
        setloadingResult(true);
        const { data } = await axios.get(`hotel/matching?key=${destination}`, {
          headers: {
            "Accept-Language": "ar",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log("search...", data.data);
        setSearchResult(data);
        setloadingResult(false);
        setShowSearchResult(true);
      } else {
        setShowSearchResult(false);
      }
    };
    getData();
  }, [destination]);

  const handleChildrenAge = (e, index) => {
    const { value } = e.target;
    const list = [...childrenAge];
    console.log(value);
    list[index] = value;
    setChildrenAge(list);
  };

  const handleAdults = (operation, index) => {
    setOptions(
      options.map((x, i) => {
        if ((operation === "i") & (i === index))
          return {
            ...x,
            adult: x.adult + 1,
          };
        if ((operation === "d") & (i === index))
          return {
            ...x,
            adult: x.adult - 1,
          };
        return x;
      })
    );
    // console.log("Options...", options[0]);
    console.log("data index is==> ", options, index);
  };

  const handleOption = (name, op) => {
    (name === "children") & (op === "i")
      ? handleChildrenAgeAdd()
      : handleRemoveChildrenAge(name);
  };

  const handleSearch = () => {
    navigate("/hotels", { state: { destination, date, options } });
  };

  return (
    <div className=" header">
      <div
        className={
          type === "List" ? "headerContainer listMode" : "headerContainer"
        }
      >
        <div className="headerList">
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faBed} />
            <span>Attraction</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
          </div>
        </div>
        {type !== "List" && (
          <>
            <h1 className="headerTitle">Find your next stay</h1>
            <p className="headerDesc">
              Search deals on hotels, homes, and much more...
            </p>

            <div className="headerSearch col-12">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                <input
                  value={destination.trimStart()}
                  type="text"
                  placeholder="Where are you going"
                  className="headerSearchInput"
                  onChange={handleGetPlaces}
                />
                {loadingResult && <span className="loader"></span>}
                {showSearchResult && (
                  <div className="searchResult">
                    {searchResult.data.length === 0 && (
                      <h5 className="notFound">Not found..</h5>
                    )}
                    <ul>
                      {searchResult.data.map((res, index) => (
                        <li
                          key={res.code}
                          onClick={(e) => {
                            setDistination(e.target.innerText);
                            // setShowSearchResult(false);
                          }}
                        >
                          <FontAwesomeIcon
                            icon={res.type === "city" ? faLocationDot : faHotel}
                            style={
                              res.type === "city"
                                ? { marginRight: "13px" }
                                : { marginRight: "10px" }
                            }
                          />
                          {res.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  onClick={() => {
                    setOpenDate(!openDate);
                    setOpenOptions(false);
                  }}
                  className="headerSearchText"
                >{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                  date[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
                {openDate && (
                  <DateRange
                    minDate={new Date()}
                    editableDateInputs={true}
                    onChange={(item) => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    className="date"
                  />
                )}
              </div>

              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                <span
                  className="headerSearchText"
                  onClick={() => {
                    setOpenOptions(!openOptions);
                    setOpenDate(false);
                  }}
                >
                  {`${options[0].adult} adult · ${childrenAge[0].age} children · ${options[0].room} room`}
                </span>
                {openOptions && (
                  <div className="options">
                    {options.map((room, i) => {
                      return (
                        <div key={i}>
                          <h4 className="roomTitle">
                            Room {i === 0 ? 1 : i + 1}
                          </h4>
                          <div className="optionItem">
                            <span className="optionText">Adult</span>
                            <div className="optionCounter">
                              <button
                                disabled={room.adult <= 1}
                                className="optionCounterButton"
                                onClick={() => handleAdults("d", i)}
                              >
                                -
                              </button>
                              <span className="optionCounterNumber">
                                {room.adult}
                              </span>
                              <button
                                disabled={room.adult > 8}
                                className="optionCounterButton"
                                onClick={() => handleAdults("i", i)}
                              >
                                +
                              </button>
                            </div>
                          </div>

                          <div className="optionItem">
                            <span className="optionText">children</span>
                            <div className="optionCounter">
                              <button
                                disabled={room.children <= 0}
                                className="optionCounterButton"
                                onClick={() => handleChildrenAgeAdd()}
                              >
                                -
                              </button>
                              <span className="optionCounterNumber">
                                {options[i].children}
                              </span>
                              <button
                                className="optionCounterButton"
                                onClick={handleChildrenAgeAdd}
                                disabled={room.children > 8}
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="optionItemAge">
                            {childrenAge.map((singleChild, index) => (
                              <div className="optionAge">
                                <select
                                  key={index}
                                  className="selectAge"
                                  name="age"
                                  id="age"
                                  onChange={(e) => handleChildrenAge(e, index)}
                                >
                                  {agesArr.map((age, index) => (
                                    <option value={age} key={index}>
                                      {age} years old
                                    </option>
                                  ))}
                                </select>
                              </div>
                            ))}
                          </div>
                          {i > 0 && (
                            <button
                              className="btnAddRoom"
                              onClick={() => removeRoom(i)}
                            >
                              Remove room
                            </button>
                          )}
                        </div>
                      );
                    })}

                    <button
                      className="btnAddRoom"
                      onClick={addNewRoom}
                      // disabled={options[0].room.length  > 3}
                    >
                      Add another room
                    </button>
                    {/* 
                    <div className="optionItem">
                      <span className="optionText">room</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.room <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.room}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div> */}
                  </div>
                )}
              </div>
              <div className="headerSearchItem">
                <button className="headerBtnSearch" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
