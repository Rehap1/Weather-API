let today = document.getElementById("today"),
    todayDate = document.getElementById("today-date"),
    cityLocation = document.getElementById("location"),
    todayDegree = document.getElementById("today-degree"),
    todayIcon = document.getElementById("today-icon"),
    description = document.getElementById("today-description"),
    humidty = document.getElementById("humidty"),
    wind = document.getElementById("wind"),
    compass = document.getElementById("compass"),
    searchBar = document.getElementById("search-bar");


let nextDay = document.getElementsByClassName("nextDay"),
    nextDayIcon = document.getElementsByClassName("nextDay-icon"),
    maxDegree = document.getElementsByClassName("max-degree"),
    minDegree = document.getElementsByClassName("min-degree"),
    nextDayDescription = document.getElementsByClassName("nextDay-description"),

    apiResponse,
    responseData,

    monthName = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Spet', 'Oct', 'Nov', 'Dec'],
    days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

async function getWeatherApi(currentCity='cairo') {
    apiResponse = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=0e06f286dcc84e7e82413909230803&q=${currentCity}&days=3`)
    responseData = await apiResponse.json()
    console.log(responseData)
    // Calling the function after getting the responseData
    displayTodayWeather();
    displayNextDayWeather();

}

getWeatherApi()

function displayTodayWeather() {
    // Date info
    let date = new Date();
    console.log(date);
    today.innerHTML = days[date.getDay()];
    todayDate.innerHTML = `${date.getDate()} ${monthName[date.getMonth()]}`;
    // Location info
    console.log(responseData.location)
    cityLocation.innerHTML = responseData.location.name;
    // Degree
    todayDegree.innerHTML = responseData.current.temp_c;
    // icon
    // console.log(responseData.current.condition.icon)
    todayIcon.setAttribute("src", `https:${responseData.current.condition.icon}`)

    description.innerHTML = responseData.current.condition.text;
    humidty.innerHTML = responseData.current.humidity;
    wind.innerHTML = responseData.current.wind_kph;
    compass.innerHTML = responseData.current.wind_dir;

}

function displayNextDayWeather() {
    for (let i = 0; i < nextDay.length; i++) {
        nextDay[i].innerHTML = days[new Date(responseData.forecast.forecastday[i + 1].date).getDay()];
        nextDayIcon[i].setAttribute('src', `https:${responseData.forecast.forecastday[i + 1].day.condition.icon}`)
        maxDegree[i].innerHTML = responseData.forecast.forecastday[i + 1].day.maxtemp_c;
        minDegree[i].innerHTML = responseData.forecast.forecastday[i + 1].day.mintemp_c;
        nextDayDescription[i].innerHTML = responseData.forecast.forecastday[i + 1].day.condition.text;
    }
}


searchBar.addEventListener("keyup", function (){
   let currentCity = searchBar.value;
    console.log(currentCity);
    getWeatherApi(currentCity);
})
