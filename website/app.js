/* Global Variables */
// **************Variables To Fetch Data from API**************
const myApiKey = "563dcacac8b587957cad8e564484e1be&units=imperial";
const basicURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const state_zip_code = document.getElementById("zip");

// **************Feeling**************
const feelings_input = document.getElementById("feelings");

// **************The Btn**************
const generate = document.getElementById("generate");

// **************Entry Variables**************
let date = document.querySelector("#app .entry #entryHolder #date");
let temp = document.querySelector("#app .entry #entryHolder #temp");
let content = document.querySelector("#app .entry #entryHolder #content");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

// **************The Btn Click Event**************
generate.addEventListener("click", displayData);
function displayData() {
  if (state_zip_code.value !== "" && feelings_input.value !== "") {
    getWeatherData(basicURL, state_zip_code.value, myApiKey)
      .then((data) => {
        postdata("/addData", {
          date: newDate,
          temp: data.main.temp,
          feelings: feelings_input.value,
        });
      })
      .then(() => {
        update();
      });
  } else {
    console.log("Please enter valid data");
  }
}
// get the temperature

async function getWeatherData(basicURL, zipCode, apikey) {
  const res = await fetch(basicURL + zipCode + "&appid=" + apikey);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// post request
async function postdata(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  try {
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

// update UI
async function update() {
  const response = await fetch("/getData");
  try {
    const data = await response.json();
    date.innerHTML = data.date;
    temp.innerHTML = Math.round(data.temp) + "  degrees";
    content.innerHTML = data.feelings;
  } catch (error) {
    console.log(error);
  }
}
