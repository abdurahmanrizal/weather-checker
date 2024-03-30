import "moment/locale/id";
import moment from "moment/moment";
import React from "react";
import {getWeatherIcon} from "./utils/helper";
function Weather({weathers}) {
  return (
    <div className="flex justify-center mt-5">
      {!weathers && <p className="font-bold text-center">Loading..</p>}
      {weathers && (
        <div className="grid lg:grid-cols-7 md:grid-cols-4 sm:grid-cols gap-4 mt-5">
          {weathers.time.map((weather, i) => (
            <Content
              date={weather}
              weathercode={weathers.weathercode[i]}
              temperature={weathers.temperature_2m_min[i]}
              key={i}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function Content(props) {
  return (
    <div key={props.key}>
      <div className="border border-sky-950 rounded py-5 px-8 shadow-2xl">
        <h4 className="font-bold text-center">
          {moment(props.date).format("MMM Do YY")}
        </h4>
        <p className="text-6xl text-center mt-3">
          {getWeatherIcon(props.weathercode)}
        </p>
        <p className="text-3xl text-center mt-3">
          {Math.round(props.temperature)} &deg;
        </p>
      </div>
    </div>
  );
}
export default Weather;
