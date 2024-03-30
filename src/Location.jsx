import {getWeatherIcon} from "./utils/helper";

function Location({location, weatherToday, country}) {
  return (
    <div className="mt-5">
      <h3 className="font-bold text-2xl text-center">
        {location?.name} {country}
      </h3>
      <h3 className="font-bold text-4xl text-center mt-2">
        Today - {weatherToday?.temperature_2m_min[0]} &deg;
      </h3>
      <h3 className="font-bold text-6xl text-center mt-4">
        {getWeatherIcon(weatherToday?.weathercode[0])}
      </h3>
    </div>
  );
}
export default Location;
