// ----- display searched city and current weather -------

function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp-display").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].main);

  celsiusTemperature = Math.round(response.data.main.temp);

  displayForecast();
}

// display default city
function displayDefaultCity(city) {
  let apiKey = "3c949ba49d38be2487ee278e0d2d4059";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

//display searched city into header
function citySearch(event) {
  event.preventDefault();

  let city = document.querySelector("#city-search").value;
  displayDefaultCity(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", citySearch);

function dateFormat(date) {
  let hours = date.getHours();
  let mins = date.getMinutes();

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (mins < 10) {
    mins = `0${mins}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[now.getDay()];

  return `${day} ${hours}:${mins}`;
}

//display weekly forecast
function displayForecast() {
  let forecast = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `        
  <div class="col-2">
    <div class="weekly-forecast-date">${day}</div>
    <div class="weekly-forecast-temp">
      <span class="weekly-high">72°</span>
      <span class="weekly-low">45°</span>
    </div>
  </div>
`;
  });

  forecastHTML = forecastHTML + `</div`;

  forecast.innerHTML = forecastHTML;
}

// display current date and time
let now = new Date();

let li = document.querySelector("#date");

li.innerHTML = dateFormat(now);

// switch between celsius and farh
let defaultTemp = document.querySelector("#temp-display");
defaultTemp.innerHTML = 76;

let celsiusTemperature = null;

function celsiusTemp(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp-display");
  temp.innerHTML = celsiusTemperature;
}

function farhTemp(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp-display");
  temp.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
}

let cTemp = document.querySelector("#celsius");
cTemp.addEventListener("click", celsiusTemp);

let fTemp = document.querySelector("#farh");
fTemp.addEventListener("click", farhTemp);

displayDefaultCity("Bloomington");
