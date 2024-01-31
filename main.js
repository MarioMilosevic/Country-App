"use strict";
import { showCountries } from "./helperFunctions/helperFunctions";

//  https://restcountries.com/v3.1/all
const brightness = document.querySelector(".brightness");
const main = document.querySelector("main");
export const countryList = document.querySelector(".country__list");


async function findCountry(){
 const response = await fetch( 'https://restcountries.com/v3.1/all')
 const countries = await response.json()
 console.log(countries);
 showCountries(countries)
}

findCountry()