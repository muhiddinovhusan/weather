import React, { useState } from 'react';
import './WeatherApp.css';
import searchIcon from '../Assets/search.png';
import cloudIcon from '../Assets/cloudy.png';
import humidityIcon from '../Assets/weather.png';
import windIcon from '../Assets/wind.png';
import clear from '../Assets/sun.png'
import drizzle from '../Assets/drizzle.png'
import rain from '../Assets/cloudy (1).png'
import snow from '../Assets/snow.png'
const WeatherApp = () => {
    const [weatherData, setWeatherData] = useState({
        temperature: '',
        location: '',
        humidity: '...',
        windSpeed: '...'
    });

    const api_key = "f87ed0ef703382c4796f98db74c8fc86";

    const searchWeather = async () => {
        const inputElement = document.getElementById('searchInput');
        if (!inputElement || !inputElement.value.trim()) return;

        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputElement.value}&units=Metric&appid=${api_key}`);
            const data = await response.json();

            setWeatherData({
                temperature:Math.floor(data.main.temp),
                location: data.name,
                humidity: data.main.humidity,
                windSpeed: Math.floor(data.wind.speed),

            })
            if (data.weather[0].icon === '01d' || data.weather[0].icon === '01n') {
                setWicon(clear);
            } else if (data.weather[0].icon === '02d' || data.weather[0].icon === '02n') {
                setWicon(cloudIcon)
            }
            else if (data.weather[0].icon === '03d' || data.weather[0].icon === '03n') {
                setWicon(drizzle)
            }
            else if (data.weather[0].icon === '04d' || data.weather[0].icon === '04n') {
                setWicon(drizzle)
            }
            else if (data.weather[0].icon === '09d' || data.weather[0].icon === '09n') {
                setWicon(rain)
            }
            else if (data.weather[0].icon === '10d' || data.weather[0].icon === '10n') {
                setWicon(rain)
            }
            
            else if (data.weather[0].icon === '13d' || data.weather[0].icon === '13n') {
                setWicon(snow)
            }
            else if (data.weather[0].icon === '50d' || data.weather[0].icon === '50n') {
                setWicon(cloudIcon)
            }
            else{
                setWicon(clear)
            }
            

        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    const [wicon, setWicon] = useState(cloudIcon)



    return (<div>

        <h1>Weather  </h1>
        <div className='container'>
            <div className="top-bar">
                <input type="text" id="searchInput" placeholder='Search' className='cityInput' />
                <div className='search-icon' onClick={searchWeather}>
                    <img style={{ width: "80%" }} src={searchIcon} alt="Search" />
                </div>
            </div>
            <div className="weather-image">
                <img style={{ width: '36%' }} src={wicon} alt="Weather" />
            </div>
            <div className='weather-temp'>{weatherData.temperature} °C</div>
            <div className="weather-location">{weatherData.location}</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidityIcon} alt="Humidity" className='icon' style={{ width: "17%" }} />
                    <div className="data">
                        <div className="humidity-percent">{weatherData.humidity}%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={windIcon} alt="Wind Speed" className='icon' style={{ width: "17%" }} />
                    <div className="data">
                        <div className="wind-rate">{weatherData.windSpeed} km/h</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
        <br />


<hr />
       <div className='footer'>
        <p>2024</p>
<p> Muhiddinov X</p>

       </div>

        
    </div>
    );
}

export default WeatherApp;
