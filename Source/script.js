// day logs - done
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// adding the live date and time - done

function dateToday(event) {
  let day = days[now.getDay()];
  let subHeading = document.querySelector("#dayAndTime");
  let timeHours = now.getHours();
  let timeMins = now.getMinutes();
  console.log(timeHours);
  subHeading.innerHTML = `${day}, ${timeHours}:${timeMins}`;
}
dateToday();

// changing the city text based on search - done

function chosenCity(event) {
  event.preventDefault();
  let city = document.querySelector(".searchInput");
  let cityChange = document.querySelector("#topCity");
  console.log(cityChange);
  cityChange.innerHTML = `${city.value}`;
}
let detailForm = document.querySelector(".searchBar");
detailForm.addEventListener("submit", chosenCity);

//changing temp data based on search - done

function newChosenCity(event) {
  event.preventDefault();
  let city = document.querySelector(".searchInput");
  apiChosenCity(city.value);
}
let detailFormNew = document.querySelector(".searchBar");
detailFormNew.addEventListener("submit", newChosenCity);

function apiChosenCity(city) {
  let apiKey = "3b37b3ce3faa04a811223a14131db55d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather); //ads the weather call from API
}

//formating the date of the forecast

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
//future temperature adding

function displayForecast(response) {
  let forecast = response.data.daily; //shows the daily forecast in the console
  console.log(response.data.daily);
  let forecastElement = document.querySelector(".weather-forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 4) {
      //adds the max number of days to show on page
      forecastHTML =
        forecastHTML +
        `
    <div class="col-3" >
<div class="day1" >${formatDay(forecastDay.dt)}</div>
<div><img src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png" atl="clear" width="75
  "/> </br>
            <span class="weatherTempMin">${Math.round(
              forecastDay.temp.min
            )}°<</span>
            <span class="weatherTempMax">${Math.round(
              forecastDay.temp.max
            )}°</span>
            </div>
    </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//getting the forecast data

function getForecast(coordinates) {
  console.log(coordinates); //gives the latlong from search
  let forecastApiKey = "5bd76300836a0463d8f43511534ac83e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${forecastApiKey}&units=metric`;

  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

// adding in weather info based on search
function showWeather(response) {
  let city = document.querySelector("#topCity");
  city.innerHTML = response.data.name; // collects city info
  let temp = document.querySelector(".temp");
  temp.innerHTML = Math.round(response.data.main.temp); //collects temp into
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.main.humidity}`; //collects humidity info
  let wind = document.querySelector("#wind");
  wind.innerHTML = `${response.data.wind.speed}`; //collects wind speed info
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  ); //changing the icon
  celciusTemp = response.data.main.temp;
  //getting the forecast data
  getForecast(response.data.coord);
}

// getting data from the geo api
document.querySelector(".myLocation").addEventListener("click", () => {
  function retrievePosition(position) {
    let geoApiKey = "5bd76300836a0463d8f43511534ac83e";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${geoApiKey}`;
    axios.get(url).then(showWeather);
  }
  navigator.geolocation.getCurrentPosition(retrievePosition);
});

//changing the temp based on celcius of farhrenhieght
function showFarhrenheightTemp(event) {
  event.preventDefault();
  let farhrenhieghtTemperature = (celciusTemp * 9) / 5 + 32;
  let temp = document.querySelector(".temp");
  temp.innerHTML = Math.round(farhrenhieghtTemperature);
}

function showCelciusTemp(event) {
  event.preventDefault();
  let celciusTemperature = celciusTemp;
  let temp = document.querySelector(".temp");
  temp.innerHTML = Math.round(celciusTemperature);
}

let celciusTemp = null;

let farhrenhieghtLink = document.querySelector(".fahrenheit");
farhrenhieghtLink.addEventListener("click", showFarhrenheightTemp);

let celciusLink = document.querySelector(".celcius");
celciusLink.addEventListener("click", showCelciusTemp);
