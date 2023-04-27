// Function to find information from the console.log and placed in the Html//


function searchWeather(){

    var city = document.querySelector(".textVal").value

    var searchHistory =[];
    searchHistory.push(city);
    console.log(searchHistory);
    localStorage.setItem('search-history', JSON.stringify(searchHistory))
    

//    var city was here I moved it to the top to test///
    var ApiKey = "7bdab0cf3daa341b1d431ecfe8584de8"
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+ApiKey+"&units=imperial")
    // fetch("https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={Apikey}")
    .then(res=>res.json())
    .then(data=>{
        let weatherIcon= document.querySelector(".icons");
        console.log(data)

        document.querySelector(".box-bodyToday").innerHTML="Wind Speed: "+data.wind.speed+"MPH";
        document.querySelector(".box-bodyTemp").innerHTML="Temp: "+data.main.temp+"℉";
        document.querySelector(".box-maxTemp").innerHTML="Max Temp: "+data.main.temp_max+"℉";
        document.querySelector(".box-minTemp").innerHTML="Min Temp: "+data.main.temp_min+"℉";
        document.querySelector(".box-Humidity").innerHTML="Humidity: "+data.main.humidity+"%";
        document.querySelector(".boxCityName").innerHTML="City name: "+data.name;
        document.querySelector(".icons").innerHTML="Icon: "+data.weather[0].icon;
        
        let iconCode = data.weather[0].icon;
  let iconUrl = "http://openweathermap.org/img/wn/" + iconCode + ".png";
  weatherIcon.setAttribute("src", iconUrl);

    })
    displayCities();
}



document.querySelector("#button-addon2").addEventListener("click", searchWeather)


var myValue = localStorage.getItem("city");
localStorage.setItem(".city", myValue);


function start(){

loadCity();
}

var storedHistory = localStorage.getItem('search-history');
//Array of Objects for localStores data
var dataStore = JSON.parse(localStorage.getItem('search-history')) || [];
console.log(dataStore)

var displayCities = function(){
    let citySearchContainer= document.querySelector("#city-search");
 citySearchContainer.innerHTML=storedHistory


    // cleaningElement(containerHistoricCities);

    if(dataStore){
        // creating a unordered list to store the info
        var ulElement = document.createElement("ul");
        ulElement.classList.add("list-unstyled");
        ulElement.classList.add("w-100");
        
        //for loop to iterate through out the localStore
        for(var i = 0; i < dataStore.length; i++){
            
            var liElement = document.createElement("li");
            // append a button with bootstraps classes inside each item
            liElement.innerHTML = "<button type='button' class='list-group-item list-group-item-action' attr='"+dataStore[i]+"'>" + dataStore[i] + "</button>";
            // liElement.innerHTML = "<list-group row m-3' attr='"+dataStore[i]+"'>" + dataStore[i] + "</button>";
            
            // append the item into its container
            ulElement.appendChild(liElement);
            }

            containerHistoricCities.appendChild(ulElement); 
        }
};

// testing to see if I can add a card//

const item = {
    name: 'Product 1',
    price: 10.99,
    quantity: 1

};

// console.log(item);

//   const key = 'cartItem1';
//   localStorage.setItem(key, JSON.stringify(item));

//   const cartList = document.querySelector('.cart-list');

// const itemString = localStorage.getItem(key);
// const itemObj = JSON.parse(itemString);

// const cartItem = document.createElement('div');
// cartItem.classList.add('cart-item');
// cartItem.innerHTML = `
//   <h3>${itemObj.name}</h3>
//   <p>Price: $${itemObj.price}</p>
//   <p>Quantity: ${itemObj.quantity}</p>
// `;

// cartList.appendChild(cartItem);

// const itemString = localStorage.getItem(key);
// const itemObj = JSON.parse(itemString);

// // Update the quantity
// itemObj.quantity += 1;

// localStorage.setItem(key, JSON.stringify(itemObj));



// var searchCities = document.querySelector(".cities-Searched");
// var dataStore= json.parse(localStorage.getItem("cities")) ||{};
