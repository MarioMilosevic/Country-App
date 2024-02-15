"use strict";
import { updateDebounceText } from "./helperFunctions/helperFunctions";

import {
  toggleItemsBackgroundColor,
  toggleBrightnessImg,
  toggleBrightnessText,
  darkElement,
  lightElement,
} from "./helperFunctions/colorHelpers";

import {
  renderPageButtons,
  pageClickedHandler,
  toggleAllPageNumbersColor,
} from "./helperFunctions/pageButtonHelpers";

import {
  showCountries,
  findCountry,
  toggleCountryAppLogo,
  showCountry,
  showPreviousCountries,
  renderFetchedCountries,
} from "./helperFunctions/countryHelpers";
import { Countries } from "./Classes/Countries";
import { DarkMode } from "./Classes/DarkMode";
import Router from "./router";

const url = `https://restcountries.com/v3.1`;
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

let fetchedCountries;

export let firstPageBtn;

(async () => {
  fetchedCountries = await findCountry(`${url}/all`);
  countries.setCountries(fetchedCountries);
  countries.sortCountries();
  showCountries(countries.getCountriesByAmount("1"));
  renderPageButtons(countries.getCountries(), pageNumbers);
  firstPageBtn = document.querySelector(".listBtn");
  firstPageBtn.classList.add("clickedDark", "clicked");
})();

countryList.addEventListener("click", (e) => showCountry(e));

countryRegion.addEventListener("change", async () => {
  const region = countryRegion.value;
  countryList.innerHTML = "";
  const urlAll = `${url}/all`;
  const urlRegion = `${url}/region/${region}`;
  region === "All"
    ? renderFetchedCountries(urlAll)
    : renderFetchedCountries(urlRegion);
});

countrySearch.addEventListener("input", async function () {
  updateDebounceText(async () => {
    const searchName = countrySearch.value.toLowerCase();
    const urlCountryName = `${url}/name/${searchName}`;
    const urlAll = `${url}/all`;
    searchName.length > 0
      ? renderFetchedCountries(urlCountryName)
      : renderFetchedCountries(urlAll);
  });
});

pageList.addEventListener("click", function (e) {
  const target = e.target;
  const pageNumber = target.id;
  if (pageNumber && countries.getCountries().length >= 22) {
    pageClickedHandler(target);
    countryList.innerHTML = "";
    showCountries(countries.getCountriesByAmount(pageNumber));
    const liItems = document.querySelectorAll(".country__list__item");
    toggleItemsBackgroundColor(liItems);
  }
});

brightness.addEventListener("click", function () {
  document.documentElement.classList.toggle("dark");
  darkMode.toggleMode();
  toggleCountryAppLogo(countryImg);
  const liItems = document.querySelectorAll(".country__list__item");
  toggleItemsBackgroundColor(liItems);
  toggleBrightnessImg();
  toggleBrightnessText();

  const renderedPageButtons = document.querySelectorAll(".listBtn");
  toggleAllPageNumbersColor(renderedPageButtons);
  const selectedPageBtn = document.querySelector(".clicked");
  console.log(selectedPageBtn);
  darkMode.getDarkMode()
    ? lightElement(selectedPageBtn)
    : darkElement(selectedPageBtn);

  const returnInformationChildren = document.querySelector(
    ".return__information__children"
  );
  if (returnInformationChildren) {
    darkMode.getDarkMode()
      ? darkElement(returnInformationChildren)
      : lightElement(returnInformationChildren);
  }
});

previousPage.addEventListener("click", function () {
  const selectedPageBtn = document.querySelector(".clicked");
  page = Number(selectedPageBtn.id);
  if (page > 1) {
    countryList.innerHTML = "";
    showCountries(countries.getCountriesByAmount(page - 1));
    selectedPageBtn.classList.remove("clicked");
    darkMode.getDarkMode()
      ? darkElement(selectedPageBtn)
      : lightElement(selectedPageBtn);
    const previousPageBtn = selectedPageBtn.previousElementSibling;
    previousPageBtn.classList.add("clicked");
    darkMode.getDarkMode()
      ? lightElement(previousPageBtn)
      : darkElement(previousPageBtn);
    page--;
  }
});

nextPage.addEventListener("click", function () {
  const selectedPageBtn = document.querySelector(".clicked");
  page = Number(selectedPageBtn.id);
  if (page < pageButtons.length) {
    countryList.innerHTML = "";
    showCountries(countries.getCountriesByAmount(page + 1));

    selectedPageBtn.classList.remove("clicked");
    darkMode.getDarkMode()
      ? darkElement(selectedPageBtn)
      : lightElement(selectedPageBtn);

    const nextPageBtn = selectedPageBtn.nextElementSibling;
    nextPageBtn.classList.add("clicked");
    darkMode.getDarkMode()
      ? lightElement(nextPageBtn)
      : darkElement(nextPageBtn);
    page++;
  }
});

function onBackButtonEvent() {
  history.pushState(null, null, "firstPage");
  showPreviousCountries();
}

window.addEventListener("popstate", onBackButtonEvent);
