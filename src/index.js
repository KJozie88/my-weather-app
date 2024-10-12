function refreshWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);

    let iconElement = document.querySelector("#icon");

    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;

    cityElement.innerHTML = response.data.city;
    timeElement.innerHTML = formatDate(date); 
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windElement.innerHTML = `${response.data.wind.speed}km/h`;
    temperatureElement.innerHTML = Math.round(temperature);
}

function formatDate(date) {

let hours = date.getHours();
let minutes = date.getMinutes();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[date.getDay()];

if (minutes < 10) {
    minutes = `0${minutes}`;
}

    return `${day}, ${hours}:${minutes}`;
}

function searchCity(city) {
let apiKey = "b30f34a03ff66542oc8t10fb8777f7a6";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");

 searchCity(searchInput.value);
}

function displayForecast() {
    

    let days  = ["Tues" ,"Wed", "Thu", "Fri", "Sat"];
    let forecastHtml = "";


    days.forEach(function (day) {
forecastHtml = 
forecastHtml + 
`
    <div class="weather-forecast-day">
                    <div class="weather-forecast-date">${day}</div>
                    <div class="weather-forecast-icon">☀️</div>
                    <div class="weather-forecast-temperatures">
                        <div class="weather-forecast-temperature">
                            <strong>15°</strong>
                        </div>
                        <div class="weather-forecast-temperature"> 9°</div>
                    </div>
                    </div> `;
    })
    
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Johannesburg");
displayForecast();
