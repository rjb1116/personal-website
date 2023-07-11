import React from "react";
import { useState } from "react";
import { DateTime, Duration } from "luxon";

var tzlookup = require("tz-lookup");

const SolarInputs = ({ latLon, setLatLon, dateTime, setDateTime }) => {
  const getDecimalHour = (dateTime) => {
    return dateTime.diff(dateTime.startOf("day")).as("hours").toFixed(2);
  };

  const [inputTime, setInputTime] = useState(getDecimalHour(dateTime));

  const [inputLatLon, setInputLatLon] = useState(
    `${latLon.latitude}, ${latLon.longitude}`
  );

  const [inputDate, setInputDate] = useState(dateTime.toISODate());

  const handleInputChangeTime = (event) => {
    setInputTime(event.target.value);

    setDateTime(
      dateTime
        .startOf("day")
        .plus(Duration.fromObject({ hours: Number(event.target.value) }))
    );
  };

  const handleInputChangeDate = (event) => {
    setInputDate(event.target.value);

    setDateTime(
      DateTime.fromObject(
        {
          year: DateTime.fromISO(event.target.value).year,
          month: DateTime.fromISO(event.target.value).month,
          day: DateTime.fromISO(event.target.value).day,
          hour: dateTime.hour,
          minute: dateTime.minute,
        },
        {
          zone: dateTime.zone,
        }
      )
    );
  };

  const regexLatLon =
    /^[(]?[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)[)]?$/;

  const [validInputLatLon, setValidInputLatLon] = useState("default");

  const handleInputChangeLatLon = (event) => {
    setInputLatLon(event.target.value);

    if (event.target.value.match(regexLatLon) != null) {
      setValidInputLatLon("valid");

      const latitude = parseFloat(
        event.target.value.split(",")[0].replace("(", "")
      );
      const longitude = parseFloat(
        event.target.value.split(",")[1].replace(")", "")
      );
      setLatLon({
        latitude: latitude,
        longitude: longitude,
      });

      const timezone = tzlookup(latitude, longitude);
      setDateTime(dateTime.setZone(timezone, { keepLocalTime: true }));
    } else {
      setValidInputLatLon("invalid");
    }
  };

  return (
    <div className="w-full h-auto text-center">
      <div className=" xl:max-w-screen-xl md:max-w-screen-md sm:max-w-screen-sm w-full h-full mx-auto flex-col">
        <div className="w-[350px] mx-auto p-4 flex-col">
          <p className=" font-mono">
            {DateTime.fromObject({
              year: 2000,
              month: 1,
              day: 1,
              hour: 1,
              minute: 1,
            })
              .startOf("day")
              .plus({ hours: Number(inputTime) })
              .toLocaleString(DateTime.TIME_SIMPLE)}
          </p>
          <div className="pt-2 pb-2">
            <input
              type="range"
              id="hour"
              name="hour"
              min="0"
              max="24"
              step="any"
              list="markers"
              className="w-full accent-[#3a8844]"
              value={inputTime}
              onChange={handleInputChangeTime}
            />
            <datalist id="markers">
              {Array(25)
                .fill()
                .map((_, i) => (
                  <option key={i.toString()} value={i.toString()}></option>
                ))}
            </datalist>
          </div>
          <p className=" font-mono text-sm pt-2">Input Date</p>
          <div className="pt-1 pb-4 w-full">
            <input
              type="date"
              id="inputDate"
              name="inputDate"
              value={inputDate}
              onChange={handleInputChangeDate}
              className=" w-full py-2 text-xs text-center border-2 border-[#3a8844] rounded-md"
            />
          </div>
          <p className=" font-mono text-sm">Input Latitude and Longitude</p>
          <p className=" text-xs italic text-gray-400">
            Recommend copying from
            <a href="https://maps.google.com"> Google Maps </a>
          </p>
          <p className=" text-xs italic text-gray-400">
            (Desktop: Right-click | Mobile: Long-press)
          </p>
          <div className="pt-2">
            <input
              type="text"
              id="inputLatLon"
              name="inputLatLon"
              placeholder={inputLatLon}
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
            Invalid input, must be of form [-90:90], [-180:180]
          </p>
          <div className=" text-sm py-4 italic text-gray-700">
            <a href="https://gml.noaa.gov/grad/solcalc/">
              Verify my values on NOAAs website!
            </a>
          </div>
          <div className=" text-sm py-4 italic text-gray-700">
            <a href="https://github.com/rjb1116/sun_coordinates">
              Walk through the math with me on my github!
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolarInputs;
