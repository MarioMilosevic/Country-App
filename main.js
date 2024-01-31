"use strict";

const brightness = document.querySelector(".brightness");
const main = document.querySelector("main");
const countryList = document.querySelector(".country__list");

const showCountries = () => {
  const country = document.createElement("li");
//   countryList.innerHTML = "";
  country.classList.add("country__list__item");
  country.innerHTML = `<img src="public/img/Flag_of_Montenegro.svg.png">
    <h2>Montenegro</h2>
    `;
    countryList.appendChild(country)
};

showCountries()
showCountries()
showCountries()
showCountries()