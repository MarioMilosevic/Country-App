"use strict";

import {
  countryList,
  router,
  searchBarContainer,
  pageList,
  renderedCountry,
  countryApp,
  countries,
  darkMode,
  pageNumbers,
} from "../main";

import {
  darkElement,
  lightElement,
  toggleItemsBackgroundColor,
} from "./colorHelpers";
import {
  renderPageButtons,
  togglePageNumbersColor,
} from "./pageButtonHelpers";

export const showCountries = (arr) => {
  arr.forEach((obj) => {
    const country = document.createElement("li");
    country.classList.add("country__list__item");
    country.innerHTML = `<img src="${obj.flags.svg}">
        <h2 class="country__name">${obj.name.official}</h2>
        `;
    countryList.appendChild(country);
  });
};

export const findCountry = async function (url) {
  try {
    const response = await fetch(url);
    const returnedCountries = await response.json();
    return returnedCountries;
  } catch (error) {
    console.log("Error fetching data:", error);
    alert(`Error fetching data: ${error}`);
  }
};

export const toggleCountryAppLogo = (img) => {
  const lightImg = "./img/planet-earth-light.jpg";
  const darkImg = "./img/planet-earth-dark.jpg";
  img.src = darkMode.getDarkMode() ? darkImg : lightImg;
};

export const showCountryInformation = (list, obj) => {
  const customObjProps = {
    firstCurrency: Object.values(obj.currencies)[0],
    firstLanguage: Object.values(obj.languages)[0],
  };
  list.innerHTML = "";
  const country = createCountry(obj, customObjProps);
  list.appendChild(country);
  const goBackBtn = country.querySelector(".return__information__children");

  darkMode.getDarkMode() ? darkElement(goBackBtn) : lightElement(goBackBtn);
  goBackBtn.addEventListener("click", showPreviousCountries);
  countryApp.addEventListener("click", showPreviousCountries);
};

const createCountry = (obj, props) => {
  const country = document.createElement("div");
  country.classList.add("country__information");
  country.innerHTML = `
    <div class="container__information">
    <div class="return__information">
    <div class="return__information__children">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
    </svg>
    <span class="go__back">Go back</span>
    </div>
    </div>
    <div class="main__information">
    <img src="${obj.flags.svg}">
    <div class="informations">
    <p>Official Name: ${obj.name.official}</p>
    <p>Continent: ${obj.continents[0]}</p>
    <p>Languages: ${props.firstLanguage}</p>
    <p>Area: ${obj.area} km<sup>2</sup></p>
    <p>Population: ${obj.population.toLocaleString()}</p>
    <p>Capital: ${obj.capital}</p>
    <p>Currency: ${props.firstCurrency.name} </p>
    </div>
    </div>
    </div>
    `;
  return country;
};

export const showPreviousCountries = () => {
  history.pushState({ page: 1 }, "Home page", "HomePage");
  showCountries(countries.getCountriesByAmount("1", countries.getCountries()));

  countryList.style.display = "grid";
  searchBarContainer.style.display = "flex";
  pageList.style.display = "flex";
  renderedCountry.style.display = "none";
  togglePageNumbersColor();
};

export const renderFetchedCountries = async (url) => {
  let response = await findCountry(url);
  countryList.innerHTML = "";
  countries.setCountries(response);
  countries.sortCountries();
  showCountries(countries.getCountriesByAmount("1"));
  const liItems = document.querySelectorAll(".country__list__item");
  toggleItemsBackgroundColor(liItems);
  renderPageButtons(response, pageNumbers);
  togglePageNumbersColor();
};

export const showCountry = async (e) => {
  const target = e.target.closest(".country__list__item");
  const countryName = target.querySelector("h2").textContent;
  const [countryObj] = await findCountry(
    `https://restcountries.com/v3.1/name/${countryName}`
  );
  const countryCode = countryObj.name.common;
  router.go(countryCode);
  countryList.style.display = "none";
  searchBarContainer.style.display = "none";
  pageList.style.display = "none";
  renderedCountry.style.display = "block";
  showCountryInformation(renderedCountry, countryObj);
};
