// Function to find information from the console.log and placed in the Html//

function searchWeather(){
    var city = document.querySelector(".textVal").value
    var ApiKey = "7bdab0cf3daa341b1d431ecfe8584de8"
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+ApiKey+"&units=imperial")
    .then(res=>res.json())
    .then(data=>{
        console.log(data)

        document.querySelector(".box-bodyToday").innerHTML="Wind Speed: "+data.wind.speed+"MPH"
        document.querySelector(".box-bodyTemp").innerHTML="Temp: "+data.main.temp+"℉"
        document.querySelector(".box-maxTemp").innerHTML="Max Temp: "+data.main.temp_max+"℉"
        document.querySelector(".box-minTemp").innerHTML="Min Temp: "+data.main.temp_min+"℉"
        document.querySelector(".box-Humidity").innerHTML="Humidity: "+data.main.humidity+"%"
        document.querySelector(".boxCityName").innerHTML="City name: "+data.name
    })
}


document.querySelector("#button-addon2").addEventListener("click", searchWeather)

var searchCities = document.querySelector("#cities-Searched");
var dataStore= json.parse(localStorage.getItem("cities")) ||{};
