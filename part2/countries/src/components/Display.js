import { useEffect } from "react";
import axios from "axios";

export function CountryDisplay({
  searchResults,
  setSearchResults,
  setClimateInfo,
  climateInfo,
  cityForWeather,
  setCityForWeather
}) {
  const WeatherAPIKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    async function obtainWeather(cityName) {
      try {
        const weatherData = await axios.get(
          `http://api.weatherapi.com/v1/current.json?key=${WeatherAPIKey}&q=${cityName}&aqi=no`
        );
        setClimateInfo(weatherData.data);
        console.log(weatherData);
      } catch (err) {
        console.log(err);
      }
    }
    obtainWeather(cityForWeather);
  }, [cityForWeather]);

  function displayCountryInfo(countryData) {
    console.log(countryData);
    setSearchResults([countryData]);
  }

  if (searchResults.length > 10) {
    return <p>Too many results, specify a different filter</p>;
  }

  if (searchResults.length <= 10 && searchResults.length > 1) {
    return (
      <>
        {searchResults.map((country) => (
          <p key={country.cca2}>
            {country.name.common}{" "}
            <button
              onClick={() => {
                displayCountryInfo(country);
              }}
            >
              Show
            </button>
          </p>
        ))}
      </>
    );
  }

  if (searchResults.length === 1) {
    const languageKeys = Object.keys(searchResults[0].languages);

    setCityForWeather(searchResults[0].capital[0]);

    return (
      <>
        <h3>
          <strong>{searchResults[0].name.common}</strong>
        </h3>
        <p>Capital: {searchResults[0].capital}</p>
        <p>Area: {searchResults[0].area}</p>
        <h3>
          <strong>Languages:</strong>
        </h3>
        <ul>
          {languageKeys.map((langKey) => (
            <li key={langKey}>{searchResults[0].languages[langKey]}</li>
          ))}
        </ul>
        <img
          src={searchResults[0].flags.png}
          alt="Flag"
          width="200"
          height="150"
        />
        <h3>
          <strong>Weather in {searchResults[0].capital}</strong>
        </h3>
        <p>Temperature: {climateInfo.current.temp_f}° Celsius</p>
        <img src={`https://${climateInfo.current.condition.icon}`} alt="Weather Icon" />
        <p>
          Wind: {climateInfo.current.wind_mph} mph direction{" "}
          {climateInfo.current.wind_dir}
        </p>
      </>
    );
  }
}
