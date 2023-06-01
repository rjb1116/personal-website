import React from "react";
import { useState } from "react";

const SolarInputs = ({ setLatLon, setDateTime }) => {
  const [inputLatLon, setInputLatLon] = useState(
    "47.65120009191971, -122.3470160056653"
  );
  const [validInputLatLon, setValidInputLatLon] = useState("default");

  const [inputDateTime, setInputDateTime] = useState("");

  const handleInputChangeLatLon = (event) => {
    setInputLatLon(event.target.value);
    checkInputValidLatLon(event.target.value)
      ? setValidInputLatLon("valid")
      : setValidInputLatLon("invalid");
  };

  const checkInputValidLatLon = (inputValue) => {
    const validLatLon = new RegExp(
      /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/
    );
    if (validLatLon.test(inputValue)) {
      return true;
    } else {
      return false;
    }
  };

  const handleInputChangeDateTime = (event) => {
    setInputDateTime(event.target.value);
  };

  const handleClick = () => {
    const latitude = parseFloat(inputLatLon.split(",")[0]);
    const longitude = parseFloat(inputLatLon.split(",")[1]);

    setLatLon({
      latitude: latitude,
      longitude: longitude,
    });

    setDateTime(inputDateTime);
  };

  return (
    <div className="w-full h-auto text-center">
      <div className="pt-20 xl:max-w-screen-xl md:max-w-screen-md sm:max-w-screen-sm w-full h-full mx-auto flex-col">
        <div className="w-[300px] mx-auto p-4 flex-col">
          <p className=" font-mono text-sm pb-2">
            Input Latitude and Longitude
          </p>
          <p className=" text-xs italic text-gray-400">
            Recommend copying from
            <a href="https://maps.google.com"> Google Maps </a>
          </p>
          <p className=" text-xs italic text-gray-400">
            (Desktop: Right-click | Mobile: Long-press)
          </p>
          <div className="pt-4">
            <input
              type="text"
              id="inputLatLon"
              name="inputLatLon"
              value={inputLatLon}
              onChange={handleInputChangeLatLon}
              className={
                validInputLatLon == "default"
                  ? "w-full border-2 border-[#3a8844] rounded-md text-xs py-2 text-center italic text-gray-400"
                  : "w-full border-2 border-[#3a8844] rounded-md text-xs py-2 text-center"
              }
            />
          </div>
          <p
            className={
              validInputLatLon == "invalid"
                ? "pt-1 pb-2 text-xs italic text-red-500"
                : "pt-1 pb-2 text-xs italic text-[#ecf0f3]"
            }
          >
            Invalid input, must be [-90:90], [-180:180]
          </p>
          <p className=" font-mono text-sm pt-2">Input Date and Time</p>
          <div className="pt-2 pb-8">
            <input
              type="datetime-local"
              id="inputDateTime"
              name="inputDateTime"
              onChange={handleInputChangeDateTime}
              className=" w-full py-2 text-xs text-center border-2 border-[#3a8844] rounded-md"
            />
          </div>
          <button
            disabled={validInputLatLon == "invalid" || inputDateTime == ""}
            className={
              validInputLatLon == "invalid" || inputDateTime == ""
                ? "p-2 rounded-xl bg-[#3a8844] text-[#ecf0f3] opacity-30 cursor-default"
                : "p-2 rounded-xl bg-[#3a8844] text-[#ecf0f3]"
            }
            onClick={handleClick}
          >
            Compute
          </button>
        </div>
      </div>
    </div>
  );
};

export default SolarInputs;
