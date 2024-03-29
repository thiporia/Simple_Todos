const weather = document.querySelector(".js-weather");
const refresh = document.querySelector(".js-refresh");

const API_KEYS = '6c547c87363e410b0ae2fb3cd722c83b';
const COORDS = 'coords';

function getWeather(lat, lng) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEYS}&units=metric`
  ).then(function(response) {
    return response.json();
  }).then(function(json) {
    refresh.classList.remove("active");
    const temperature = json.main.temp;
    const place = json.name;
    weather.innerText = `${temperature} ℃ @ ${place}`;
  });

}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  // console.log(position);
  // ## refresh spin
  refresh.classList.add("active");

  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  // ## same key and value 
  const coordsObj = {
    latitude,
    longitude
  };

  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log('Cant access geo location');
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if( loadedCoords === null ) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
  refresh.addEventListener("click", askForCoords);
}

init();