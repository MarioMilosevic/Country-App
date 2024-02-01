"use strict";
import { showCountries } from "./helperFunctions/helperFunctions";

//  https://restcountries.com/v3.1/all
const brightness = document.querySelector("#brightness");
const main = document.querySelector("main");
export const countryList = document.querySelector(".country__list");
const countryRegion = document.querySelector(".country__region");

async function findCountry() {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const countries = await response.json();
//   console.log(countries);
  showCountries(countries);
}

findCountry();
// da uzme vrijednost iz optiona/selecta i da to renderuje

countryRegion.addEventListener('change', function(){
    console.log(countryRegion.value)

})