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
import React, { useContext, useEffect, useState } from "react";
import "./header.css";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useNavigate } from "react-router-dom";
import axios from "../../hooks/endPoint";
import { SearchContext } from "../../context/SearchContext";
import HeaderTabs from "./headerTabs";

const Header = ({ type }) => {
  const initialOption = {
    adult_no: 1,
    children: 0,
    room: 1,
    child_age: [],
  };
  const [destination, setDistination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [loadingResult, setloadingResult] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [options, setOptions] = useState([initialOption]);
  const [updateAges, setUpdateAges] = useState([]);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  // var startDate = date[0].startDate.toISOString().split("T")[0];
  // var endDate = date[0].endDate.toISOString().split("T")[0];

  const navigate = useNavigate();
  const [openOptions, setOpenOptions] = useState(false);

  const handleRemoveChildrenAge = (index) => {
    const newOptions = options.slice();
    const room = newOptions[index];
    newOptions[index] = {
      ...room,
      children: room.children - 1,
      child_age: room.child_age.slice(0, room.child_age.length - 1),
    };
    setOptions(newOptions);
  };

  const handleChildrenAgeAdd = (index) => {
    const newOptions = options?.slice();
    const room = newOptions[index];
    newOptions[index] = {
      ...room,
      children: room.children + 1,
      child_age: [...room.child_age, room.child_age[index]],
    };
    setOptions(newOptions);
  };

  // Add new room
  const addNewRoom = (i) => {
    setOptions([...options, initialOption]);
    console.log("Add new room", options);
  };

  // Remove the current room
  const removeRoom = (index) => {
    let data = [...options];
    data.splice(index, 1);
    setOptions(data);
  };

  let agesArr = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const handleGetPlaces = (e) => {
    let typing = e.target.value;
    setDistination(typing);
    setShowSearchResult(false);
  };
  useEffect(() => {
    console.log();
    const getData = async () => {
      if (destination.length >= 3) {
        setloadingResult(true);
        const { data } = await axios.get(`hotel/matching?key=${destination}`, {
          headers: {
            "Accept-Language": "en",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setSearchResult(data);
        setloadingResult(false);
        if (data.data.length >= 1) {
          setShowSearchResult(true);
        }
      } else {
        setShowSearchResult(false);
      }
    };
    getData();
  }, [destination]);

  const handleChildrenAge = (i, e) => {
    const updateAge = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    console.log(updateAge, i);
    setUpdateAges((prev) => [...prev, updateAge]);
    let getAge = options.map((x, i) => {
      return {
        ...x,
        child_age: [updateAge[i]],
      };
    });

    // setOptions(getAge);

    // console.log(options[0].child_age);
  };

  const handleAdults = (operation, index) => {
    setOptions(
      options.map((x, i) => {
        if ((operation === "i") & (i === index))
          return {
            ...x,
            adult_no: x.adult_no + 1,
          };
        if ((operation === "d") & (i === index))
          return {
            ...x,
            adult_no: x.adult_no - 1,
          };
        return x;
      })
    );
  };

  // const { dispatch } = useContext(SearchContext);

  const handleSearch = () => {
    // dispatch({ type: "NEW_SEARCH", payload: { destination, date, options } });
    navigate("/hotels", { state: { searchResult, date, options, updateAges } });
  };

  // Calculate adults
  Array.prototype.sum = function (prop) {
    var total = 0;
    for (var i = 0, _len = this.length; i < _len; i++) {
      total += this[i][prop];
    }
    return total;
  };

  return (
    <div className="header">
      <div
        className={
          type === "List" ? "headerContainer listMode" : "headerContainer"
        }
      >
        {/* Tabs header */}
        <HeaderTabs />
        {type !== "List" && (
          <>
            <h1 className="headerTitle">Find your next stay</h1>
            <p className="headerDesc">
              Search deals on hotels, homes, and much more...
            </p>

            <div className="headerSearch col-12">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faHotel} className="headerIcon" />
                <input
                  value={destination}
                  type="text"
                  placeholder="Where are you going"
                  className="headerSearchInput"
                  onChange={handleGetPlaces}
                />
                {loadingResult && <span className="loaderHeader"></span>}
                {showSearchResult && (
                  <div className="searchResult">
                    {searchResult.data.length === 0 && (
                      <h5 className="notFound">Not found..</h5>
                    )}
                    <ul>
                      {searchResult.data.map((res) => (
                        <li
                          key={res.code}
                          onClick={(e) => {
                            console.log("first Click");
                            setDistination(e.target.innerText);

                            if (destination === destination) {
                              console.log("ressss", res);
                              setShowSearchResult(false);
                            }
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
                    onChange={(item) => {
                      setDate([item.selection]);
                      console.log("date.....", date);
                    }}
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
                  {`${
                    options.sum("adult_no") + options.sum("children")
                  } travelers - `}
                  <FontAwesomeIcon icon={faBed} className="headerIcon" />
                  {` ${options.length} room`}
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
                                disabled={room.adult_no <= 1}
                                className="optionCounterButton"
                                onClick={() => handleAdults("d", i)}
                              >
                                -
                              </button>
                              <span className="optionCounterNumber">
                                {room.adult_no}
                              </span>
                              <button
                                disabled={room.adult_no > 8}
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
                                onClick={() => handleRemoveChildrenAge(i)}
                              >
                                -
                              </button>
                              <span className="optionCounterNumber">
                                {room.children}
                              </span>
                              <button
                                className="optionCounterButton"
                                onClick={() => handleChildrenAgeAdd(i, "i")}
                                disabled={room.children > 8}
                              >
                                +
                              </button>
                            </div>
                          </div>
                          {room.children > 0 && (
                            <div className="optionItemAge">
                              {room.child_age.map((singleChild, index) => (
                                <div className="optionAge" key={index}>
                                  <p style={{ color: "red" }}>{singleChild}</p>
                                  <select
                                    className="selectAge"
                                    name="child_age"
                                    value={singleChild}
                                    id="child_age"
                                    onChange={(e) =>
                                      handleChildrenAge(index, e)
                                    }
                                    // onChange={(e) => {
                                    //   const { value } = e.target;
                                    //   // setOptions({ singleChild: value });
                                    //   console.log("hey im age..", value);
                                    //   console.log("hey option..", options);
                                    // }}
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
                          )}
                          {i > 0 ? (
                            <button
                              className="btnAddRoom"
                              onClick={() => removeRoom(i)}
                            >
                              Remove room
                            </button>
                          ) : (
                            <button
                              className="btnAddRoom"
                              onClick={() => addNewRoom(i)}
                              disabled={options.length >= 4}
                            >
                              Add another room
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              <div className="headerSearchItem">
                <button
                  className="headerBtnSearch"
                  onClick={handleSearch}
                  disabled={searchResult.length < 1}
                >
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
