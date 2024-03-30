import {useEffect, useState} from "react";
import Loader from "./Loader";
import Location from "./Location";
import Search from "./Search";
import Weather from "./Weather";
import {convertToFlag} from "./utils/helper";
function App() {
  const [search, setSearch] = useState(null);
  const [location, setLocation] = useState(null);
  const [weathers, setWeathers] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [country, setCountry] = useState("");

  function handleSearchInput(e) {
    setSearch(e.target.value);
  }
  const fetchLocation = async (location, controller) => {
    try {
      setIsLoading(true);
      setError("");

      if (location.length < 3) {
        setLocation(null);
        setWeathers(null);
        return;
      }
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${location.toLowerCase()}`,
        {signal: controller.signal}
      );
      const data = await res.json();
      if (!data.results) {
        throw new Error("Location not found");
      }
      const {latitude, longitude, timezone, name, country_code} =
        data.results.at(0);
      setLocation(data.results.at(0));
      const resWeather = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
      );
      const dataWeather = await resWeather.json();
      setWeathers(dataWeather);
      setCountry(convertToFlag(country_code));
      setError("");
    } catch (error) {
      if (error.name !== "AbortError") {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(
    function () {
      if (search) {
        const controller = new AbortController();
        fetchLocation(search, controller);
        return () => controller.abort();
      }
    },
    [search]
  );
  return (
    <div className="flex justify-items-center p-4 h-screen">
      <div className="bg-white rounded p-5 w-full py-5">
        <h4 className="font-bold text-3xl text-center">Weather Checker</h4>
        <Search onHandleSearchInput={handleSearchInput} />
        {!isLoading && !location && (
          <p className="font-bold text-center mt-5 font-mono">
            your location not found, please search...
          </p>
        )}
        {isLoading && <Loader />}
        {location && !isLoading && (
          <>
            <Location
              location={location}
              weatherToday={weathers?.daily}
              country={country}
            />
            <Weather weathers={weathers?.daily} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
