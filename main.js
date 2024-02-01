"use strict";
import { showCountries } from "./helperFunctions/helperFunctions";

//  https://restcountries.com/v3.1/all
const brightness = document.querySelector("#brightness");
const main = document.querySelector("main");
export const countryList = document.querySelector(".country__list");
const countryRegion = document.querySelector(".country__region");

async function findCountry(region) {
  const response = await fetch(region);
  const countries = await response.json();
  showCountries(countries);
}

findCountry("https://restcountries.com/v3.1/all");
countryRegion.addEventListener("change", function () {
  const region = countryRegion.value;
  countryList.innerHTML = "";
  findCountry(`https://restcountries.com/v3.1/region/${region}`);
});
