import React, { useState } from "react";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";

const API_KEY = "926073da7bf5515c80d687218895d5c0";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);

  const fetchWeather = async () => {
    if (!city) {
      alert("Please enter a city name.");
      return;
    }

    try {
      // Fetch current weather data
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      setWeatherData(weatherResponse.data);

      // Fetch 4-day forecast data
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
      );
      const forecastList = forecastResponse.data.list
        .filter((_, index) => index % 8 === 0)
        .slice(1, 5);
      setForecastData(forecastList);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("Failed to fetch data. Please try a different city.");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center text-white"
      style={{ backgroundImage: `url('/Images/background.jpg')` }}
    >
      <div className="flex mb-6 w-2/3 lg:w-1/2 my-5">
        <input
          type="text"
          placeholder="Enter a City...."
          className="w-full p-4 rounded-l-full outline-none bg-white text-gray-700 shadow-md"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          onClick={fetchWeather}
          className="p-4 bg-blue-700 text-white rounded-r-full hover:bg-blue-600 transition"
        >
          Search
        </button>
      </div>

      {weatherData && (
        <div className="bg-white bg-opacity-20 rounded-lg p-8 shadow-lg flex items-center justify-center text-center space-x-6 w-[300px] h-[200px] md:w-[600px] md:h-[300px] lg:w-[800px] rounded-2xl">
          <div className="flex flex-col items-center md:mb-[50px]">
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt="weather icon"
              className="w-20 h-20"
            />
          </div>
          <div className="flex flex-col text-left md:mb-[50px]">
            <p className="text-lg font-semibold text-black">Today</p>
            <h2 className="text-4xl font-bold text-black">{weatherData.name}</h2>
            <p className="text-xl font-semibold mt-2 text-black">
              Temperature: {Math.round(weatherData.main.temp)}°C
            </p>
            <p className="text-lg text-gray-700 mt-1 text-black">
              {weatherData.weather[0].description}
            </p>
          </div>
        </div>
      )}

      {forecastData && (
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 my-8">
          {forecastData.map((day, index) => (
            <WeatherCard key={index} dayData={day} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
