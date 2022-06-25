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

function showWeather(response) {
  let city = document.querySelector("#topCity");
  city.innerHTML = response.data.name; // collects city info
  let temp = document.querySelector(".temp");
  temp.innerHTML = `${response.data.main.temp}`; //collects temp into
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.main.humidity}`; //collects humidity info
  let wind = document.querySelector("#wind");
  wind.innerHTML = `${response.data.wind.speed}`; //collects wind speed info
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute =
    ("src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`); //changing the icon
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
