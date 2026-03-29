import { useEffect, useState } from 'react';
import './App.css'

function App() {

  const [weather, setWeather] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const weeklyWeather = [
    { day: 'Sun', icon: './images/windy-sunny.png', temp: '32' },
    { day: 'Mon', icon: './images/sun.png', temp: '31' },
    { day: 'Tue', icon: './images/cloudy.png', temp: '27' },
    { day: 'Wed', icon: './images/cloudy-rain.png', temp: '31' },
    { day: 'Thu', icon: './images/rain.png', temp: '25' },
    { day: 'Fri', icon: './images/rain.png', temp: '26' },
    { day: 'Sat', icon: './images/cloudy-rain.png', temp: '30' },
  ];

  const getWeather = async () => {
    const response = await fetch('https://api.weatherapi.com/v1/current.json?key=364269e1e95d40ef94693853261203&q=London');
    const data = await response.json();
    setWeather(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getWeather();
  }, []);

  if (isLoading) {
    return <h1 className='text-white'>Loading...</h1>
  }

  return (
    <div className="app-bg d-flex align-items-center justify-content-center">

      <div className="weather-container container-fluid p-3">
        <div className="row">

          {/* LEFT PANEL */}
          <div className="col-lg-4 text-white">
            <div className="left-panel h-100 d-flex flex-column p-4">
              <div className="search-wrapper">
                <form className="d-flex align-items-center search-form rounded-pill" role="search">
                  <i className="bi bi-search search-icon" />
                  <input
                    className="search-input"
                    type="search"
                    placeholder="Search city..."
                    aria-label="Search"
                  />
                </form>
              </div>

              <div className="main-info">
                <div className="text-center mt-5">
                  <img src="./images/weather-image.png" className="weather-hero-img img-fluid" alt="Weather" />
                </div>
                <div className='mx-4'>
                  <div className="current-temp text-center">{weather.current.temp_c}°C</div>
                  <div className="location-day">
                    <span>{weather.location.name}</span>
                    <span>Monday</span>
                  </div>
                  <hr />
                </div>
              </div>

              <div className="minor-info mx-4">
                <div><i className="bi bi-cloud-rain" /> {weather.current.condition.text}</div>
                <div><i className="bi bi-thermometer-low" /> Min Temperature - {weather.current.feelslike_c}°C</div>
                <div><i className="bi bi-thermometer-high" /> Max Temperature - 31°C</div>
              </div>

              <div className="metric-card">
                <div className="sunrise-sunset-item">
                  <i className="bi bi-water sunrise-sunset-icon" />
                  <div>
                    <div className="sunrise-sunset-time">{weather.current.humidity}%</div>
                    <div className="sunrise-sunset-label-small">Humidity</div>
                  </div>
                </div>
                <div className="sunrise-sunset-item">
                  <i className="bi bi-wind sunrise-sunset-icon" />
                  <div>
                    <div className="sunrise-sunset-time">{weather.current.wind_kph}km/h</div>
                    <div className="sunrise-sunset-label-small">Wind Speed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="col-lg-8 text-white">
            <div className="right-panel h-100 d-flex flex-column p-4">

              {/* Day Toggle */}
              <div className="day-toggle">
                <ul className="nav nav-underline">
                  <li className="nav-item text-opacity-50">
                    <a className="nav-link" href="#">Today</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link active" href="#">Week</a>
                  </li>
                </ul>
              </div>

              {/* Weather Cards */}
              <div className="weather-cards my-auto">
                {weeklyWeather.map((weather, i) => (
                  <div key={i} className="weather-day-card">
                    <div className="weather-day-label">{weather.day}</div>
                    <div>
                      <img src={weather.icon} alt={weather.day} className="weather-day-icon img-fluid" />
                    </div>
                    <div className="weather-day-temp">{weather.temp}&deg;</div>
                  </div>
                ))}
              </div>

              {/* Today's Overview */}
              <div className="todays-overview my-auto">
                <h2 className="overview-title">Today's Overview</h2>
                <div className="overview-cards">
                  <div className='overview-card status-good'>
                    <div className="overview-card-label">{'Air Quality Index'}</div>
                    <div className="overview-card-content">
                      <div>
                        <div className="overview-card-value">{53}</div>
                        <div className='overview-card-status status-good'>Good</div>
                      </div>
                      <div>
                        <img src={'./images/air-pollution.png'} alt="" className="overview-card-icon img-fluid" />
                      </div>
                    </div>
                  </div>

                  <div className='overview-card status-moderate'>
                    <div className="overview-card-label">UV Index</div>
                    <div className="overview-card-content">
                      <div>
                        <div className="overview-card-value">{3}</div>
                        <div className='overview-card-status status-moderate'>Moderate</div>
                      </div>
                      <div>
                        <img src={'./images/uv.png'} alt="" className="overview-card-icon img-fluid" />
                      </div>
                    </div>
                  </div>

                  <div className='overview-card status-normal'>
                    <div className="overview-card-label">{'Pressure (hpa)'}</div>
                    <div className="overview-card-content">
                      <div>
                        <div className="overview-card-value">{weather.current.pressure_mb}</div>
                        <div className='overview-card-status status-normal'>Normal</div>
                      </div>
                      <div>
                        <img src={'./images/barometer.png'} alt="" className="overview-card-icon img-fluid" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bottom-section mt-auto">
                <div className='col-md-8 col-12'>
                  <img src="./images/precipitation.png" alt="Precipitation chart" className="precipitation-chart img-fluid" />
                </div>
                <div className="sunrise-sunset-card">
                  <div className="sunrise-sunset-label">Sunrise & Sunset</div>
                  <div className="sunrise-sunset-item">
                    <i className="bi bi-sunrise sunrise-sunset-icon" />
                    <div>
                      <div className="sunrise-sunset-label-small">Sunrise</div>
                      <div className="sunrise-sunset-time">7:06 AM</div>
                    </div>
                  </div>
                  <div className="sunrise-sunset-item">
                    <i className="bi bi-sunset sunrise-sunset-icon" />
                    <div>
                      <div className="sunrise-sunset-label-small">Sunset</div>
                      <div className="sunrise-sunset-time">7:03 PM</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  )
}

export default App;
