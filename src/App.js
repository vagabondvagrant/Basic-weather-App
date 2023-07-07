import "./styles.css";
import { useState } from "react";
import axios from "axios";

export default function WeatherForecast() {
  const [location, setLocation] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "388008674b8bb3c410acb3f55605a915";

  const fetchWeatherData = () => {
    const units = "metric";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=${units}`;
    setLoading(true);

    axios
      .get(apiUrl)
      .then((response) => {
        setLoading(false);
        setData(response.data);
      })
      .catch((error) => {
        setError("Oops! Weather info couldn't be loaded");
        console.log("Error fetching weather data:", error);
      });
  };
  return (
    <div className="App">
      <div className="weather">
        <input
          type="text"
          placeholder="Write the City/country name"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button classname="Btn" onClick={fetchWeatherData}>
          search
        </button>
        {loading && <p>fetching...</p>}
        {error && <p>{error}</p>}
        {data && (
          <div>
            <p>Temperature: {data.main.temp}°C</p>
            <p>Humidity: {data.main.humidity}%</p>
            <p>Description: {data.weather[0].description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
