let cityInput = document.getElementById('city')
let getForecastButton = document.getElementById('get_forecast_button');
getForecastButton.addEventListener('click',getWeatherData);

let cityCard = document.getElementById('city_card')

async function getWeatherData() {
    let cityInputValue = await cityInput.value;
    let requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+cityInputValue+'&appid=6be3d65396fe855209deeba6f83431be&units=metric'
    
    let response = await fetch(requestUrl, {mode: 'cors'})
    let weatherData = await response.json();
    console.log(weatherData);
    // error if no such city
    if (!response.ok) {
        alert('There is no such city! Check your spelling and try again...')
    }

    // display weather info
    let cityName = document.createElement('h2')
    cityName.textContent = weatherData.name
    cityCard.appendChild(cityName);

    let temp = document.createElement('p')
    temp.textContent = 'Current temperature: '+ weatherData.main.temp + '°C'
    cityCard.appendChild(temp)

    let feelsLike = document.createElement('p')
    feelsLike.textContent = 'Feels like '+ weatherData.main.feels_like + '°C'
    cityCard.appendChild(feelsLike)

    let humidity = document.createElement('p');
    humidity.textContent = 'Humidity: ' + weatherData.main.humidity + '%';
    cityCard.appendChild(humidity)

    let pressure = document.createElement('p');
    pressure.textContent = 'Pressure: '+ weatherData.main.pressure; + ' mb'
    cityCard.appendChild(pressure)

    let wind = document.createElement('p');
    wind.textContent = 'Wind: ' + weatherData.wind.speed + ' m/s'
    cityCard.appendChild(wind);
}