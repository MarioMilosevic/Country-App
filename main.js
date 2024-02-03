"use strict";
import {
  showCountries,
  findCountry,
  toggleCountryAppLogo,
  toggleLiBackgroundColor,
  toggleBrightnessImg,
  toggleBrightnessText,
} from "./helperFunctions/helperFunctions";
import { Countries } from "./Classes/Countries";
import { DarkMode } from "./Classes/DarkMode";
//  https://restcountries.com/v3.1/all
const brightness = document.querySelector("#brightness");
export const brightnessImg = brightness.querySelector("img");
export const brightnessText = brightness.querySelector("p");
const main = document.querySelector("main");
const countrySearch = document.querySelector("#country__search");
export const countryList = document.querySelector(".country__list");
const countryRegion = document.querySelector(".country__region");
const countryImg = document.querySelector("#country__app__logo");
export const darkMode = new DarkMode();
export const countries = new Countries();

const fetchedCountries = await findCountry(
  "https://restcountries.com/v3.1/all"
);
countries.setCountries(fetchedCountries);
// console.log(fetchedCountries);
showCountries(countries.getCountries());

countryRegion.addEventListener("change", async () => {
  const region = countryRegion.value;
  countryList.innerHTML = "";
  const urlAll = "https://restcountries.com/v3.1/all";
  const url = `https://restcountries.com/v3.1/region/${region}`;
  if (region === "All") {
    const responseAll = await findCountry(urlAll);
    countries.setCountries(responseAll);
    showCountries(responseAll);
  } else {
    const response = await findCountry(url);
    console.log(response);
    countries.setCountries(response);
    showCountries(response);
  }
});

countrySearch.addEventListener("input", function () {
  console.log("radi");
  const currentCountries = countries.getCountries();
  const search = countrySearch.value.toLowerCase();
  const searchedCountries = currentCountries.filter((country) =>
    country.name.common.toLowerCase().includes(search)
  );
  console.log(searchedCountries);
  countryList.innerHTML = "";
  showCountries(searchedCountries);
});

brightness.addEventListener("click", function () {
  document.documentElement.classList.toggle("dark");
  darkMode.toggleMode();
  toggleCountryAppLogo(countryImg);
  const liItems = document.querySelectorAll(".country__list__item");
  toggleLiBackgroundColor(liItems);
  toggleBrightnessImg();
  toggleBrightnessText();
  // ////////////////////////////////////////
  // const light = "./public/img/sun.jpg";
  // const dark = "./public/img/moon.png";
  // brightnessImg.src = darkMode.getDarkMode() ? dark : light
  // brightnessText.textContent = darkMode.getDarkMode() ? "Dark Mode" : "Light Mode"
  // img.src = darkMode.getDarkMode() ? darkImg : lightImg;
});

//////////////////////////////////////////////////////////////////////////////////////////////////////
//  const route = (event) => {
//   event = event || window.event
//   event.preventDefault()
//   window.history.pushState({}, "", event.target.href)
// }

//  const routes = {
//   404: "/pages/404.html",
//   "/": "/pages/index.html",
//   "/about": "/pages/about.html",
//   "/lorem": "/pages/lorem.html"
// }

//  const handleLocation = async () => {
//   const path = window.location.pathname;
//   const route = routes[path] || routes[404]
//   const html = await fetch(route).then((data) => data.text())
//   document.getElementById('app').innerHTML = html
// }

// window.onpopstate = handleLocation
// window.route = route
// handleLocation()
