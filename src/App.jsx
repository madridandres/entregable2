
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'

function App() {

  const [degreesText, setDegreesText] = useState("Degrees Farenheit")
  const [weather, setWeather] = useState({});
  const valueCelsius = (weather.main?.temp - 273.15).toFixed(2)
  const [degressValue, setDegreesValue] = useState(`${valueCelsius} ºC`)
  useEffect(() => {
    
    const success = pos => {
      const lat = pos.coords.latitude
      const lon = pos.coords.longitude
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=3ef5f68f4abccf18012b553be447f251`)
        .then(res => setWeather(res.data))
    }

    navigator.geolocation.getCurrentPosition(success);
  }, [])

  const switchDegrees = () =>{
    if(degreesText === "Degrees Farenheit" && degressValue === `${valueCelsius} ºC`){
      setDegreesText("Degrees Celsius")
      setDegreesValue(`${((valueCelsius * 9/5) + 32).toFixed(2)} ºF`)
    }else{
      setDegreesText("Degrees Farenheit")
      setDegreesValue(`${valueCelsius} ºC`)
    }
  }

  return (
    <div className="App">
      <div className="Card">
        <h2>Weather App</h2>
        <h4>City: {weather.name}, {weather.sys?.country}</h4>
        <div className="Dates">
          <div className='ClimateValue'>
            <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" />
            <h2>{degressValue}</h2>
          </div>
          <div>
            <ul><h4>"{weather.weather?.[0].description}"</h4>
              <li><i class="fa-solid fa-wind"></i> Wind speed {weather.wind?.speed} m/s</li>
              <li><i class="fa-solid fa-cloud"></i> Clouds: {weather.clouds?.all}%</li>
              <li><i class="fa-solid fa-droplet"></i> Humidity: {weather.main?.humidity}%</li>
            </ul>
          </div>
        </div>
        <button onClick={switchDegrees}>{degreesText}</button>
      </div>
      
    </div>
  )
}

export default App
