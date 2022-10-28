var cityInput = document.getElementById("input");
var searchBtn = document.getElementById("searchBtn");
var clearBtn = document.getElementById("clearBtn");  //temporary
var ul = document.getElementById("cityList");
var mainCityH2 = document.getElementById("cityh2");
var APIKey = "82daf106d4faabdcbc91ddf602ace3b6";

var searchHistory = [];

searchBtn.addEventListener("click", function handleClick() {
    
    var cityName = document.getElementById("input").value;
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial" + "&appid=" + APIKey;
    
    if (cityName === "") {
        return;
    }

    searchHistory.push(cityName);

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
    

        var dateFormat = moment.unix(data.list[0].dt).format("MM/D/YYYY");
        console.log(dateFormat);
        
        mainCityH2.append(data.city.name + " (" + dateFormat + ") " + iconUrl);
        
    })
    
});

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
        

    }


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
