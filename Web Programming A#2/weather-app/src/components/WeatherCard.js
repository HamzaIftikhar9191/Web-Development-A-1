import React from 'react';

function WeatherCard({ dayData }) {
    const date = new Date(dayData.dt * 1000);
    const dayName = date.toLocaleDateString("en-US", { weekday: 'long' });

    return (
        <div className="bg-white bg-opacity-30 p-4 rounded-lg text-center shadow-md">
            <p className="text-lg font-bold">{dayName}</p>
            <img
                src={`http://openweathermap.org/img/wn/${dayData.weather[0].icon}@2x.png`}
                alt="weather icon"
                className="w-12 h-12 mx-auto"
            />
            <p className="text-xl font-semibold">{Math.round(dayData.main.temp)}°C</p>
        </div>
    );
}

export default WeatherCard;
