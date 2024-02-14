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
  showCountry,
  goBackDark,
  goBackLight,
  showPreviousCountries,
  updateDebounceText,
} from "./helperFunctions/helperFunctions";
import { Countries } from "./Classes/Countries";
import { DarkMode } from "./Classes/DarkMode";
import Router from "./router";
import { url } from "./constants";

const brightness = document.querySelector("#brightness");
const countryRegion = document.querySelector(".country__region");
const countryImg = document.querySelector("#country__app__logo");
const countrySearch = document.querySelector("#country__search");
const previousPage = document.querySelector(".previousPage");
const nextPage = document.querySelector(".nextPage");
const pageButtons = document.querySelectorAll(".listBtn");
export const main = document.querySelector("main");
export const searchBarContainer = document.querySelector(
  ".search__bar__container"
);
export const countryApp = document.querySelector(".country__app");
export const renderedCountry = document.querySelector(".rendered__country");
export const brightnessImg = brightness.querySelector("img");
export const brightnessText = brightness.querySelector("p");
export const countryList = document.querySelector(".country__list");
export const pageList = document.querySelector(".pageList");
export const pageNumbers = document.querySelector(".pageNumbers");

export const darkMode = new DarkMode();
export const router = new Router();
export const countries = new Countries();
let page = 0;

window.addEventListener("DOMContentLoaded", function () {
  router.init();
});

// const fetcher = async () => {
//   const fetchedCountries = await findCountry(`${url}/all`);
//   return fetchedCountries
// }
let fetchedCountries;

export let firstPageBtn;

(async () => {
  fetchedCountries = await findCountry(`${url}/all`);
  countries.setCountries(fetchedCountries);
  countries.sortCountries();
  showCountries(countries.get24Countries("1").sort());
  renderPageButtons(countries.getCountries(), pageNumbers);

  const firstPageBtn = document.querySelector(".listBtn");
  firstPageBtn.classList.add("clickedDark", "clicked");
})();

countryList.addEventListener("click", (e) => showCountry(e));

countryRegion.addEventListener("change", async () => {
  const region = countryRegion.value;
  countryList.innerHTML = "";
  const urlAll = `${url}/all`;
  const url = `${url}/region/${region}`;
  if (region === "All") {
    const responseAll = await findCountry(urlAll);
    router.go("firstPage");
    countries.setCountries(responseAll);
    countries.sortCountries();
    showCountries(countries.get24Countries("1"));
    const liItems = document.querySelectorAll(".country__list__item");
    toggleLiBackgroundColor(liItems);
    renderPageButtons(responseAll, pageNumbers);
    firstPageBtn.classList.add("selected");
  } else {
    const response = await findCountry(url);
    router.go(region);
    countries.setCountries(response);
    countries.sortCountries();
    showCountries(countries.get24Countries("1").sort());
    pageNumbers.innerHTML = "";
    const liItems = document.querySelectorAll(".country__list__item");
    toggleLiBackgroundColor(liItems);
    renderPageButtons(response, pageNumbers);
    pageClickedHandler(firstPageBtn);
    firstPageBtn.classList.add("clickedDark", "clicked");
  }
});

countrySearch.addEventListener("input", async function () {
  updateDebounceText(async () => {
    const searchName = countrySearch.value.toLowerCase();
    if (searchName.length > 0) {
      const urlCountryName = `${url}/name/${searchName}`;
      let searchedCountries = await findCountry(urlCountryName);
      // ///////////////////
      countries.setCountries(searchedCountries);
      countries.sortCountries();
      countryList.innerHTML = "";
      showCountries(countries.get24Countries("1").sort());
      const liItems = document.querySelectorAll(".country__list__item");
      toggleLiBackgroundColor(liItems);
      renderPageButtons(searchedCountries, pageNumbers);
      const firstPageBtn = document.querySelector(".listBtn");
      firstPageBtn.classList.add("clickedDark", "clicked");
    }
    if (searchName.length < 1) {
      const urlAll = `${url}/all`;
      let searchedCountries = await findCountry(urlAll);
      countryList.innerHTML = "";
      countries.setCountries(searchedCountries);
      countries.sortCountries();
      showCountries(countries.get24Countries("1").sort());
      const liItems = document.querySelectorAll(".country__list__item");
      toggleLiBackgroundColor(liItems);
      renderPageButtons(searchedCountries, pageNumbers);
      const firstPageBtn = document.querySelector(".listBtn");
      firstPageBtn.classList.add("clickedDark", "clicked");
    }
  });
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

function onBackButtonEvent() {
  history.pushState(null, null, "firstPage");
  showPreviousCountries();
}

window.addEventListener("popstate", onBackButtonEvent);
