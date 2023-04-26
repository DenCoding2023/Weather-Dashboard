function searchWeather(){
    var city = document.querySelector(".textVal").value
    var ApiKey = "7bdab0cf3daa341b1d431ecfe8584de8"
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+ApiKey+"&units=imperial")
    .then(res=>res.json())
    .then(data=>{
        console.log(data)

        document.querySelector(".box-bodyToday").innerHTML="Wind Speed: "+data.wind.speed
        document.querySelector(".box-bodyTemp").innerHTML="Temp: "+data.main.temp+"℉"
    })
}

document.querySelector("#button-addon2").addEventListener("click", searchWeather)