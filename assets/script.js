var cityInput = document.getElementById("input");
var searchBtn = document.getElementById("searchBtn");
var ul = document.getElementById("cityList");
var mainCity = document.getElementById("main-city");
var mainCityH2 = document.getElementById("cityh2");
var mainIcon = document.getElementById("main-icon");
var temp = document.getElementById("temp");
var wind = document.getElementById("wind");
var humidity = document.getElementById("humidity");
var APIKey = "82daf106d4faabdcbc91ddf602ace3b6";

// Variables for 5-day forecast
// Day 1
var forecast1 = document.getElementById("forecast-date-1");
var icon1 = document.getElementById("icon1");
var temp1 = document.getElementById("temp1");
var wind1 = document.getElementById("wind1");
var humidity1 = document.getElementById("humidity1");

// Variables for 5-day forecast
// Day 2
var forecast2 = document.getElementById("forecast-date-2");
var icon2 = document.getElementById("icon2");
var temp2 = document.getElementById("temp2");
var wind2 = document.getElementById("wind2");
var humidity2 = document.getElementById("humidity2");

// Variables for 5-day forecast
// Day 3
var forecast3 = document.getElementById("forecast-date-3");
var icon3 = document.getElementById("icon3");
var temp3 = document.getElementById("temp3");
var wind3 = document.getElementById("wind3");
var humidity3 = document.getElementById("humidity3");

// Variables for 5-day forecast
// Day 4
var forecast4 = document.getElementById("forecast-date-4");
var icon4 = document.getElementById("icon4");
var temp4 = document.getElementById("temp4");
var wind4 = document.getElementById("wind4");
var humidity4 = document.getElementById("humidity4");

// Variables for 5-day forecast
// Day 5
var forecast5 = document.getElementById("forecast-date-5");
var icon5 = document.getElementById("icon5");
var temp5 = document.getElementById("temp5");
var wind5 = document.getElementById("wind5");
var humidity5 = document.getElementById("humidity5");


var searchHistory = [];
var cityNameInput;

/* This funciton attaches an event listener to the search button which takes the value of the user input and places the value at the begining of the searchHistory array. If the array holds more than 8 search history entries, the entry at the end of the array will be removed. This function also passes the city name value to the get weather function by calling the getWeather function. */
searchBtn.addEventListener("click", function handleClick() {
    cityNameInput = document.getElementById("input").value;

    if (cityNameInput === "") {
        return;
    }

    if (searchHistory.length > 7) {
        searchHistory.unshift(cityNameInput);
        searchHistory.pop();
    } else {
        searchHistory.unshift(cityNameInput);
    }

    getWeather(cityNameInput);
});

/* The getWeather function fetches the openweathermap api with the requested city name and the requested units of measure. The information is returned in the promise, and that information is appended to the html elements which displays the weather information in the browser.*/
function getWeather(cityName) {

    mainCityH2.innerHTML = "";
    temp.innerHTML = "";
    wind.innerHTML = "";
    humidity.innerHTML = "";
   
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial" + "&appid=" + APIKey;

    storeCityName();
    renderCityName();

    console.log(cityName);
    console.log(APIKey);
    fetch(queryURL)
    .then(function(response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        console.log(data.city.name);
        console.log(data.list[0].dt);
        console.log(data.list[0].weather[0].icon);
        console.log(data.list[0].main.temp);
        console.log(data.list[0].wind.speed);
        console.log(data.list[0].main.humidity);

        var iconCode = data.list[0].weather[0].icon;
       
        var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";

        mainIcon.setAttribute('src', iconUrl);
    
        var dateFormat = moment.unix(data.list[0].dt).format("MM/D/YYYY");
        console.log(dateFormat);
        
        mainCityH2.append(data.city.name + " (" + dateFormat + ") ");
        mainIcon.append(iconUrl);

        temp.append("Temp: " + data.list[0].main.temp + "\u00B0 F");
        wind.append("Wind: " + data.list[0].wind.speed + " MPH");
        humidity.append("Humidity: " + data.list[0].main.humidity + " %");

        
        //Function for 5-day forecast with parameters to dynamically update the weather information in the browser.
        function fiveDayForecast(dateP, iconCodeP, iconUrlP, arryP, forecastElP, iconElP, tempElP, windElP, humidityElP,) {
        var dateP = moment.unix(data.list[arryP].dt).format("MM/D/YYYY"); 
        var iconCodeP = data.list[arryP].weather[0].icon;
        var iconUrlP = "http://openweathermap.org/img/w/" + iconCodeP + ".png";

        forecastElP.innerHTML = "";
        iconElP.innerHTML = "";
        tempElP.innerHTML = "";
        windElP.innerHTML = "";
        humidityElP.innerHTML = "";

        forecastElP.append(dateP);
        iconElP.setAttribute('src', iconUrlP);
        tempElP.append("Temp: " + data.list[arryP].main.temp + "\u00B0 F")
        windElP.append("Wind: " + data.list[arryP].wind.speed + " MPH");
        humidityElP.append("Humidity: " + data.list[arryP].main.humidity + " %");
        }

        /*The fiveDayForecast function is called five times with different arguments for each call to update the five-day weather forecast dynamically.*/
        fiveDayForecast("date1", "iconCode1", "iconUrl1", 2, forecast1, icon1, temp1, wind1, humidity1);

        fiveDayForecast("date2", "iconCode2", "iconUrl2", 10, forecast2, icon2, temp2, wind2, humidity2);

        fiveDayForecast("date3", "iconCode3", "iconUrl3", 21, forecast3, icon3, temp3, wind3, humidity3);

        fiveDayForecast("date4", "iconCode4", "iconUrl4", 26, forecast4, icon4, temp4, wind4, humidity4);

        fiveDayForecast("date5", "iconCode5", "iconUrl5", 34, forecast5, icon5, temp5, wind5, humidity5);
    })
}
    
// This function converts the user's input into a string and stores it in local storage.
function storeCityName() {
    localStorage.setItem("stored-name", JSON.stringify(searchHistory));
}

/*This function iterates through the searchHistory array in the local storage and attaches the index value to each created button element in the html file using the DOM. The event delagation function determines which button was clicked and calls the getWeather function with the appropriate cityName string value placed as the argument of the called function. */
function renderCityName() {
    
    clearRenderedList();
        for (var i = 0; i < searchHistory.length; i++) {
            var searchHistName = searchHistory[i];
                
            var listEl = document.createElement("li");
            var buttonEl = document.createElement("button");
            buttonEl.setAttribute("data-index", i);
            buttonEl.textContent = searchHistName;
            
            ul.appendChild(listEl);
            listEl.appendChild(buttonEl);
        
        }
    }

    document.addEventListener("click", function(event) {
        if(event.target && event.target.dataset.index !=undefined) {
            console.log(event.target.dataset);
            console.log(event.target.textContent);
            getWeather(event.target.textContent)
        }
    })


// This function retrieves the values from the array in local storage and converts the strings back into objects. The call function is always called to display the search history immediately when the user refreshes the page.
function init() {
    var retrieveCityName =JSON.parse(localStorage.getItem("stored-name"));
    if (retrieveCityName !== null) {
        searchHistory = retrieveCityName;
    }
    renderCityName();
}

init();

// This function clears the search history before the renderCityName function can append the search name values to the elements in the html document. This allows the viewer to see each search added to the list one by one witout duplicates when iterating through the array.
function clearRenderedList() {
    ul.innerHTML = "";
}

