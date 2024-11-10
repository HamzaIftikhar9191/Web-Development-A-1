import React from "react";
import "./animation.css";

function WeatherCard({ dayData }) {
  const date = new Date(dayData.dt * 1000);
  const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

  return (
    <div
      className="bg-white bg-opacity-30 p-4 rounded-lg text-center shadow-md w-40 h-40 rounded-3xl relative 
               md:-top-[120px] transition-transform transform hover:scale-105 hover:bg-opacity-40"
    >
      {/* Apply -top and z-index on tablet screens and above */}
      <p className="text-lg text-black font-bold">{dayName}</p>
      <img
        src={`http://openweathermap.org/img/wn/${dayData.weather[0].icon}@2x.png`}
        alt="weather icon"
        className="w-12 h-12 mx-auto weather-icon"
      />
      <p className="text-xl text-black font-semibold">
        {Math.round(dayData.main.temp)}°C
      </p>
    </div>
  );
}

export default WeatherCard;
