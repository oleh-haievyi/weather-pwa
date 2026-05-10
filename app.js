const weatherButton = document.getElementById("weatherButton");
const weatherOutput = document.getElementById("weatherOutput");

weatherButton.addEventListener("click", function () {
    weatherOutput.innerHTML = "<p>Loading weather data...</p>";

    if (!navigator.geolocation) {
        weatherOutput.innerHTML = "<p>Geolocation is not supported by this browser.</p>";
        return;
    }

    navigator.geolocation.getCurrentPosition(loadWeather, showLocationError);
});

function loadWeather(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const apiUrl =
        "https://api.open-meteo.com/v1/forecast?latitude=" +
        latitude +
        "&longitude=" +
        longitude +
        "&current=temperature_2m,weather_code,wind_speed_10m";

    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            showWeather(data);
        })
        .catch(function () {
            weatherOutput.innerHTML = "<p>Could not load weather data.</p>";
        });
}

function showWeather(data) {
    const current = data.current;

    weatherOutput.innerHTML =
        "<h2>Current weather</h2>" +
        "<p>Temperature: " + current.temperature_2m + " °C</p>" +
        "<p>Wind speed: " + current.wind_speed_10m + " km/h</p>";
}

function showLocationError() {
    weatherOutput.innerHTML = "<p>Location access was denied.</p>";
}