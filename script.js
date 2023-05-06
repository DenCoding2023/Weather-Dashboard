
var today = dayjs();
var dayWeek = today.format('DD/MM/YY');
$('#2a').text(dayWeek);


const searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];



function searchWeatherAndLocalStorage() {

    var city = document.querySelector(".textVal").value


    searchHistory.push(city);
    console.log(searchHistory);
    localStorage.removeItem("searchHistory");

    localStorage.setItem('searchHistory', JSON.stringify(searchHistory))

    // get the city name from local storage - set to variable to pass into api call
    //localStorage.getItem('search-history')

    //    var city was here I moved it to the top to test///
    var ApiKey = "7bdab0cf3daa341b1d431ecfe8584de8"
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + ApiKey + "&units=imperial")
        // fetch("https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={Apikey}")
        .then(res => res.json())
        .then(data => {
            let weatherIcon = document.querySelector(".icons");
            console.log(data)
            console.log(data.coord.lat);
            console.log(data.coord.lon);
            fiveDayforcast(data.coord.lat, data.coord.lon);

            

            document.querySelector(".box-bodyToday").innerHTML = "Wind Speed: " + data.wind.speed + "MPH";
            document.querySelector(".box-bodyTemp").innerHTML = "Temp: " + data.main.temp + "℉";
            document.querySelector(".box-maxTemp").innerHTML = "Max Temp: " + data.main.temp_max + "℉";
            document.querySelector(".box-minTemp").innerHTML = "Min Temp: " + data.main.temp_min + "℉";
            document.querySelector(".box-Humidity").innerHTML = "Humidity: " + data.main.humidity + "%";
            document.querySelector(".boxCityName").innerHTML = "City name: " + data.name;
            // document.querySelector(".icons").innerHTML = "Icon: " + data.weather[0].icon;

            let iconCode = data.weather[0].icon;
            let iconUrl = "http://openweathermap.org/img/wn/" + iconCode + ".png";
            weatherIcon.setAttribute("src", iconUrl);

        })
    displayCities();
    
}



document.querySelector("#button-addon2").addEventListener("click", searchWeatherAndLocalStorage)


var myValue = localStorage.getItem("city");
localStorage.setItem(".city", myValue);
// console.log(myValue)


function start() {

    loadCity();
}
// Variable provided by abs to help log//
// var storedHistory = localStorage.getItem('search-history');
//Array of Objects for localStores data


var displayCities = function (cities) {
    var dataStore = JSON.parse(localStorage.getItem('searchHistory')) || [];
    // console.log(dataStore) ****this repeats again

    let citySearchContainer = document.querySelector("#city-search");
    // console.log("#city-search")



    // cleaningElement(containerHistoricCities);

    if (searchHistory) {
        // creating a unordered list to store the info
        var ulElement = document.createElement("ul");
        ulElement.classList.add("saveCity")
        ulElement.classList.add("list-unstyled");
        ulElement.classList.add("w-100");
        citySearchContainer.innerHTML = "";
        //for loop to iterate through out the localStore
        for (var i = 0; i < searchHistory.length; i++) {

            var liElement = document.createElement("li");
            // append a button with bootstraps classes inside each item
            // liElement.innerHTML = "<button type='button' class='list-group-item list-group-item-action' attr='"+dataStore[i]+"'>" + dataStore[i] + "</button>";
            liElement.innerHTML = "<button type='button' .class='col-3 col-md-3 col-xl-3 colThrew' onclick='searchWeather(this)' attr='" + searchHistory[i] + "'>" + searchHistory[i] + "</button>";


            // append the item into its container
            ulElement.appendChild(liElement);

        }

        citySearchContainer.appendChild(ulElement);
    }
};



// var clearElement = function (element) {
//     element.innerHTML = "";
// };



function searchWeather(item) {

    var city = item.getAttribute('attr');
    console.log(item.getAttribute('attr'));

    var ApiKey = "7bdab0cf3daa341b1d431ecfe8584de8"
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + ApiKey + "&units=imperial")
        // fetch("https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={Apikey}")
        .then(res => res.json())
        .then(data => {
            let weatherIcon = document.querySelector(".icons");
            console.log(data)
            console.log(data.coord.lat);
            console.log(data.coord.lon);
            fiveDayforcast(data.coord.lat, data.coord.lon);



            document.querySelector(".box-bodyToday").innerHTML = "Wind Speed: " + data.wind.speed + "MPH";
            document.querySelector(".box-bodyTemp").innerHTML = "Temp: " + data.main.temp + "℉";
            document.querySelector(".box-maxTemp").innerHTML = "Max Temp: " + data.main.temp_max + "℉";
            document.querySelector(".box-minTemp").innerHTML = "Min Temp: " + data.main.temp_min + "℉";
            document.querySelector(".box-Humidity").innerHTML = "Humidity: " + data.main.humidity + "%";
            document.querySelector(".boxCityName").innerHTML = "City name: " + data.name;
            document.querySelector(".icons").innerHTML = "Icon: " + data.weather[0].icon;

            let iconCode = data.weather[0].icon;
            let iconUrl = "http://openweathermap.org/img/wn/" + iconCode + ".png";
            weatherIcon.setAttribute("src", iconUrl);

            
        })
    displayCities();

}
displayCities();

// Five day forcast

function fiveDayforcast(lat, lon) {


    var ApiKey = "7bdab0cf3daa341b1d431ecfe8584de8"
    // fetch("https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+ApiKey+"&units=imperial")
    fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + ApiKey + "&units=imperial")
        .then(res => res.json())
        .then(data => {
            let weatherIcon = document.querySelector(".icons");
            console.log(data)
            var forecastContainer = document.querySelector("#forecast-container");
            // var element=data.length 
            
            forecastContainer.innerHTML=""

            for (let i = 0; i < data.list.length; i += 8) {
                var element = data.list[i]
                console.log("here")

                var parentElement = document.createElement("div");
                parentElement.setAttribute("class", "fc");
                var divElement = document.createElement("div");
                divElement.innerHTML = dayjs(element.dt_txt).format('MM/DD/YY')+ "<br/>Temp:" + element.main.temp + "℉" + "<br/> Max Temp:" + element.main.temp_max +
                    "<br/>Humidity:" + element.main.humidity + "% <br/>Wind:" + element.wind.speed;
               
                    // element.list[0].wind.speed +"MPH"
                divElement.className = "fc";

                            
                let iconCode = element.weather[0].icon;
                let iconUrl = "http://openweathermap.org/img/wn/"+iconCode +".png";
                var iconImg = document.createElement("img");
                iconImg.setAttribute("class", "img-w");
                iconImg.setAttribute("src", iconUrl);
                parentElement.appendChild(iconImg);
                parentElement.appendChild(divElement);
                forecastContainer.appendChild(parentElement);
       
                
          }
                
        });

        
}





