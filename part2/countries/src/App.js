import { useState, useEffect } from "react";
import axios from "axios";
import { Display } from "./components/Display";

function App() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [singleCity, setSingleCity] = useState("");
  const [weather, setWeather] = useState({
    current: {
      temp_f: "",
      condition: { icon: "" },
      wind_mph: "",
      wind_dir: "",
    },
  });

  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        setCountries(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCountries();
  }, []);

  useEffect(() => {
    setFilteredCountries(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, countries]);

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className="App">
      <form>
        <label>Find countries </label>
        <input
          name="name"
          type="text"
          value={search}
          onChange={handleChange}
        />
      </form>

      <Display
        countriesSearch={filteredCountries}
        setCountriesSearch={setFilteredCountries}
        setWeather={setWeather}
        weather={weather}
        singleCity={singleCity}
        setSingleCity={setSingleCity}
      />
    </div>
  );
}

export default App;
