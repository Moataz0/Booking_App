import { format } from "date-fns";
import React, { useState } from "react";
import { DateRange } from "react-date-range";
import { useLocation } from "react-router-dom";
import { Navbar, Header, SearchItem } from "../../components";
import "./list.css";
function List() {
  const location = useLocation();

  const [openDate, setOpenDate] = useState(false);
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [options, setOptions] = useState(location.state.options);
  return (
    <div>
      <Navbar />
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
              >{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                date[0].endDate,
                "MM/dd/yyyy"
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
                  <input type="number" className="lsOptionInput" />
                </div>

                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    max price <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput" />
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
          <div className="listResult">
            <SearchItem />
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;