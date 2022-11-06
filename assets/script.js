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
var cityNameInput = document.getElementById("input").value;


searchBtn.addEventListener("click", function handleClick() {
    var cityNameInput = document.getElementById("input").value;

    if (cityNameInput === "") {
        return;
    }

    if (searchHistory.length > 3) {
        searchHistory.unshift(cityNameInput);
        searchHistory.pop();
    } else {
        searchHistory.unshift(cityNameInput);
    }

    getWeather(cityNameInput);
});

function getWeather(cityName) {

    mainCityH2.innerHTML = "";
    temp.innerHTML = "";
    wind.innerHTML = "";
    humidity.innerHTML = "";
   
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial" + "&appid=" + APIKey;
    
    // if (cityName === "") {
    //     return;
    // }

    // if (searchHistory.length > 3) {
    //     searchHistory.unshift(cityName);
    //     searchHistory.pop();
    // } else {
    //     searchHistory.unshift(cityName);
    // }
    

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

        
        //Function for 5-day forecast 
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
        fiveDayForecast("date1", "iconCode1", "iconUrl1", 2, forecast1, icon1, temp1, wind1, humidity1);

        fiveDayForecast("date2", "iconCode2", "iconUrl2", 10, forecast2, icon2, temp2, wind2, humidity2);

        fiveDayForecast("date3", "iconCode3", "iconUrl3", 21, forecast3, icon3, temp3, wind3, humidity3);

        fiveDayForecast("date4", "iconCode4", "iconUrl4", 26, forecast4, icon4, temp4, wind4, humidity4);

        fiveDayForecast("date5", "iconCode5", "iconUrl5", 34, forecast5, icon5, temp5, wind5, humidity5);
    })
}
    


function storeCityName() {
    localStorage.setItem("stored-name", JSON.stringify(searchHistory));
}


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

    
    console.log(i);
    }

    document.addEventListener("click", function(event) {
        if(event.target && event.target.dataset.index !=undefined) {
            console.log(event.target.dataset);
            console.log(event.target.textContent);
            getWeather(event.target.textContent)
        }
    })


function init() {
    var retrieveCityName =JSON.parse(localStorage.getItem("stored-name"));
    if (retrieveCityName !== null) {
        searchHistory = retrieveCityName;
    }
    renderCityName();
}

init();

function clearRenderedList() {
    ul.innerHTML = "";
}

//temporary
clearBtn.addEventListener("click", function handleClick() {
    localStorage.clear();
    clearRenderedList();
})
