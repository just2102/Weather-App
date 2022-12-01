let cityInput = document.getElementById('city')
let getForecastButton = document.getElementById('get_forecast_button');
getForecastButton.addEventListener('click',getWeatherData);

let cityCardContainer = document.getElementById('city_card_container')

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
    let cityCard = document.createElement('div')
    cityCard.setAttribute('class','city_card')


    let cityName = document.createElement('h2')
    cityName.textContent = weatherData.name
    cityCard.appendChild(cityName);

    let country = weatherData.sys.country.toLowerCase();
    console.log(country);
    let countryFlag = document.createElement('img')
    countryFlag.setAttribute('class','country_flag')
    countryFlag.src = './img/country-flags/svg/'+country+'.svg'
    cityCard.appendChild(countryFlag);

    let photo = document.createElement('img');
    photo.setAttribute('class','city_photo')
    let photoUrl = 'https://www.googleapis.com/customsearch/v1?key=AIzaSyD2wVwFAcFWWK-1eyeXJTq8nLRQdbOgU1U&cx=04a3e366cd91447e7&q='+weatherData.name+' '+'&searchType=image&fileType=jpg&imgSize=medium&alt=json'
    let photoResponse = await fetch(photoUrl, {mode:'cors'})
    let photoData = await photoResponse.json();
    console.log(photoData);
    let photoSource = photoData.items[Math.floor(Math.random()*3)].link
    photo.src = photoSource
    cityCard.appendChild(photo);

    let weatherInfo = document.createElement('p');
    weatherInfo.setAttribute('class','weather_info')
    //weatherInfo.textContent = weatherData.weather[0]['main']
    cityCard.appendChild(weatherInfo)
    let weatherPic = document.createElement('img')
    weatherPic.setAttribute('class','weather_icon')
    if (weatherData.weather[0]['main']=='Clouds') {
        weatherPic.src = './img/weather-icons/cloudy.png'
    } else if (weatherData.weather[0]['main']=='Rain') {
        weatherPic.src = './img/weather-icons/rain.png'
    } else if (weatherData.weather[0]['main']=='Snow') {
        weatherPic.src = './img/weather-icons/snow.png'
    } else if (weatherData.weather[0]['main']=='Haze') {
        weatherPic.src = './img/weather-icons/haze.png'
    } else if (weatherData.weather[0]['main']=='Clear') {
        weatherPic.src = './img/weather-icons/sun.png'
    } else {
        weatherPic.src = './img/weather-icons/default.png'
    }
    weatherInfo.appendChild(weatherPic);

    let temp = document.createElement('p')
    temp.setAttribute('class','temp_info')
    temp.textContent = 'Current temperature: '+ weatherData.main.temp + '°C'
    cityCard.appendChild(temp)

    let feelsLike = document.createElement('p')
    feelsLike.textContent = 'Feels like '+ weatherData.main.feels_like + '°C'
    temp.appendChild(feelsLike)

    let wind = document.createElement('p');
    wind.setAttribute('class','wind_info')
    wind.textContent = 'Wind: ' + weatherData.wind.speed + ' m/s'
    cityCard.appendChild(wind);

    let otherInfo = document.createElement('p')
    otherInfo.setAttribute('class','other_info')
    cityCard.appendChild(otherInfo)

    let humidity = document.createElement('p');
    humidity.textContent = 'Humidity: ' + weatherData.main.humidity + '%';
    otherInfo.appendChild(humidity)

    let pressure = document.createElement('p');
    pressure.textContent = 'Pressure: '+ weatherData.main.pressure; + ' mb'
    otherInfo.appendChild(pressure)





    cityCardContainer.appendChild(cityCard);
}