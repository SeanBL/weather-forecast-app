var cityInput = document.getElementById("input");
var searchBtn = document.getElementById("searchBtn");
var clearBtn = document.getElementById("clearBtn");  //temporary
var ul = document.getElementById("cityList");


var searchHistory = [];

searchBtn.addEventListener("click", function handleClick() {
    console.log("it works");

    var cityName = document.getElementById("input").value;

    if (cityName === "") {
        return;
    }

    searchHistory.push(cityName);

    storeCityName();
    renderCityName();
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
