"use strict";
import {
  showCountries,
  findCountry,
  toggleCountryAppLogo,
  toggleLiBackgroundColor,
  toggleBrightnessImg,
  toggleBrightnessText,
  renderPageButtons,
  togglePageNumbersColor,
  darkButton,
  lightButton,
  pageClickedHandler,
  showCountryInformation,
  showCountry,
  goBackDark,
  goBackLight,
} from "./helperFunctions/helperFunctions";
import { Countries } from "./Classes/Countries";
import { DarkMode } from "./Classes/DarkMode";
import { Router } from "./Router/Router";

export const router = new Router();

window.addEventListener("DOMContentLoaded", function () {
  console.log("loaded");
  if (!window.location.href.includes("?page=1")) {
    window.location.href = "?page=1";
  } else {
    return;
  }
  // router.init();
  // window.location.href = "mario";
});

export const main = document.querySelector("main");
const brightness = document.querySelector("#brightness");
export const searchBarContainer = document.querySelector(
  ".search__bar__container"
);
export const countryApp = document.querySelector(".country__app");
export const renderedCountry = document.querySelector(".rendered__country");
export const brightnessImg = brightness.querySelector("img");
export const brightnessText = brightness.querySelector("p");
const countrySearch = document.querySelector("#country__search");
export const countryList = document.querySelector(".country__list");
const countryRegion = document.querySelector(".country__region");
const countryImg = document.querySelector("#country__app__logo");
export const pageList = document.querySelector(".pageList");
export const pageNumbers = document.querySelector(".pageNumbers");
export const darkMode = new DarkMode();
export const countries = new Countries();
let page = 0;
const previousPage = document.querySelector(".previousPage");
const nextPage = document.querySelector(".nextPage");

const url = function (arg) {
  `https://restcountries.com/v3.1/${arg}`;
};

// const router = new Router(routes)
// router.navigateTo('/about')

// window.addEventListener("popstate", function () {
//   router.loadInitialRoute();
// });

const fetchedCountries = await findCountry(
  "https://restcountries.com/v3.1/all"
);

countries.setCountries(fetchedCountries);
countries.sortCountries();

showCountries(countries.get24Countries("1").sort());
renderPageButtons(countries.getCountries(), pageNumbers);
// ///////////////////////////////////////////////////////////////////////////////////////////////
countryList.addEventListener("click", (e) => showCountry(e));

/////////////////////////////////////////////////////////
export const firstPageBtn = document.querySelector(".listBtn");
const pageButtons = document.querySelectorAll(".listBtn");
firstPageBtn.classList.add("clickedDark", "clicked");

countryRegion.addEventListener("change", async () => {
  const region = countryRegion.value;
  countryList.innerHTML = "";
  const urlAll = "https://restcountries.com/v3.1/all";
  const url = `https://restcountries.com/v3.1/region/${region}`;
  if (region === "All") {
    const responseAll = await findCountry(urlAll);
    countries.setCountries(responseAll);
    countries.sortCountries();
    showCountries(countries.get24Countries("1"));
    const liItems = document.querySelectorAll(".country__list__item");
    toggleLiBackgroundColor(liItems);
    renderPageButtons(responseAll, pageNumbers);
    firstPageBtn.classList.add("selected");
  } else {
    const response = await findCountry(url);
    countries.setCountries(response);
    countries.sortCountries();
    showCountries(countries.get24Countries("1").sort());
    pageNumbers.innerHTML = "";
    const liItems = document.querySelectorAll(".country__list__item");
    toggleLiBackgroundColor(liItems);
    renderPageButtons(response, pageNumbers);
    pageClickedHandler(firstPageBtn);
  }
});

countrySearch.addEventListener("input", function () {
  const currentCountries = countries.getCountries();
  const search = countrySearch.value.toLowerCase();
  const searchedCountries = currentCountries.filter((country) =>
    country.name.common.toLowerCase().includes(search)
  );
  countryList.innerHTML = "";
  showCountries(searchedCountries);
  const liItems = document.querySelectorAll(".country__list__item");
  toggleLiBackgroundColor(liItems);
  renderPageButtons(searchedCountries, pageNumbers);
});

pageList.addEventListener("click", function (e) {
  const target = e.target;
  const pageNumber = target.id;
  if (pageNumber && countries.getCountries().length >= 22) {
    pageClickedHandler(target);
    countryList.innerHTML = "";
    showCountries(countries.get24Countries(pageNumber));
    const liItems = document.querySelectorAll(".country__list__item");
    toggleLiBackgroundColor(liItems);
  }
});

brightness.addEventListener("click", function () {
  document.documentElement.classList.toggle("dark");
  darkMode.toggleMode();
  toggleCountryAppLogo(countryImg);
  const liItems = document.querySelectorAll(".country__list__item");
  toggleLiBackgroundColor(liItems);
  toggleBrightnessImg();
  toggleBrightnessText();
  togglePageNumbersColor(pageButtons);
  const selectedPageBtn = document.querySelector(".clicked");
  darkMode.getDarkMode()
    ? lightButton(selectedPageBtn)
    : darkButton(selectedPageBtn);

  const returnInformationChildren = document.querySelector(
    ".return__information__children"
  );
  if (returnInformationChildren) {
    darkMode.getDarkMode()
      ? goBackDark(returnInformationChildren)
      : goBackLight(returnInformationChildren);
  }
});

previousPage.addEventListener("click", function () {
  const selectedPageBtn = document.querySelector(".clicked");
  page = Number(selectedPageBtn.id);
  if (page > 1) {
    countryList.innerHTML = "";
    showCountries(countries.get24Countries(page - 1));

    selectedPageBtn.classList.remove("clicked");
    darkMode.getDarkMode()
      ? darkButton(selectedPageBtn)
      : lightButton(selectedPageBtn);

    const previousPageBtn = selectedPageBtn.previousElementSibling;
    previousPageBtn.classList.add("clicked");
    darkMode.getDarkMode()
      ? lightButton(previousPageBtn)
      : darkButton(previousPageBtn);
    page--;
  }
});

nextPage.addEventListener("click", function () {
  const selectedPageBtn = document.querySelector(".clicked");
  page = Number(selectedPageBtn.id);

  if (page < pageButtons.length) {
    countryList.innerHTML = "";
    showCountries(countries.get24Countries(page + 1));

    selectedPageBtn.classList.remove("clicked");
    darkMode.getDarkMode()
      ? darkButton(selectedPageBtn)
      : lightButton(selectedPageBtn);

    const nextPageBtn = selectedPageBtn.nextElementSibling;
    nextPageBtn.classList.add("clicked");
    darkMode.getDarkMode() ? lightButton(nextPageBtn) : darkButton(nextPageBtn);
    page++;
  }
});

function onBackButtonEvent(e) {
  e.preventDefault();
  // var currentLocation = window.location.pathname;
  console.log("aaaaaaaaaaa");
  history.pushState(null, null, "?page=1");
}

window.addEventListener("popstate", onBackButtonEvent);

// Cleanup
window.addEventListener("popstate", onBackButtonEvent);

// window.addEventListener("popstate", (event) => {
//   // router.init()
//   console.log(
//     `location: ${document.location}, state: ${JSON.stringify(event.state)}`
//   );
//   console.log('popstate');
//   // history.pushState({ page: 1 }, "title 1", "?page=1");
// });

// const popStateEvent = new PopStateEvent("popstate", { state: history.state });
// window.dispatchEvent(popStateEvent);

// window.addEventListener("popstate", (event) => {
//   console.log(
//     `location: ${document.location}, state: ${JSON.stringify(event.state)}`
//   );
// });

// window.addEventListener("popstate", (event) => {
//   console.log(
//     `location: ${document.location}, state: ${JSON.stringify(event.state)}`,
//   );
// });
// history.pushState({ page: 1 }, "title 1", "?page=1");

// history.pushState({ page: 1 }, "title 1", "?page=1");
// history.pushState({ page: 2 }, "title 2", "?page=2");
// history.replaceState({ page: 3 }, "title 3", "?page=3");
// history.back(); // Logs "location: http://example.com/example.html?page=1, state: {"page":1}"
// history.back(); // Logs "location: http://example.com/example.html, state: null"
// history.go(2); // Logs "location: http://example.com/example.html?page=3, state: {"page":3}"

// window.addEventListener("DOMContentLoaded", async () => {
//   app.router = router;
//   // app.router.init();
// });

// const dugme = document.querySelector(".test");
// dugme.addEventListener("click", function () {
//   // app.router.go("sir", true);
//   // history.pushState({ page:1 }, "", "sir");
// });
