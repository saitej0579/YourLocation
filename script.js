// const API_KEY = "168771779c71f3d64106d8a88376808a";
// let city = prompt("enter city name.?");
// const response =  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
// const data = response.json();
// console.log(data);
// const response1 = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);


const API_KEY = "168771779c71f3d64106d8a88376808a";
const x = document.querySelector(".lon");
const y = document.querySelector(".lat");
const button = document.querySelector("[data-button]");



document.querySelector("[data-button]").addEventListener("click", () => {
    const elements = document.querySelectorAll(".hidden");
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.style.visibility = "visible";
        }, index * 400); // Display each element after 1 second delay
    });

    // You can trigger your data fetching functions here to fill the content
    getLocation();
    ip();
});




function getLocation() {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }

    function showPosition(position) {
        console.log(position);
        x.innerHTML = position.coords.longitude 
        y.innerHTML = position.coords.latitude;
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        info(lat,lon);
    }
}


async function info(lat,lon) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        const data = await response.json(); // Added await here
        dispPlace(data);

    } catch (e) {
        console.error("Error fetching weather data:", e); // Added error handling
    }
}

function dispPlace(data){
    document.getElementById("country").textContent = data.sys.country;

    document.getElementById("place").textContent = data.name;

    document.getElementById("weather").textContent = data.weather[0].description + " is there";

    document.getElementById("temp").textContent = data.main.temp + " celsius";

    document.getElementById("pressure").textContent = data.main.pressure + " pascal";
    
}

function ip() {
    button.style.display = "none";
    // Fetch the IP address from the API
    fetch("https://api.ipify.org?format=json")
        .then(response => response.json())
        .then(data => {
            // Display the IP address on the screen
            document.getElementById("ip-address").textContent = data.ip;
        })
        .catch(error => {
            console.error("Error fetching IP address:", error);
        });
}

button.addEventListener("click", getLocation);
button.addEventListener("click", ip);

