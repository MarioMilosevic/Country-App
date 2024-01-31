"use strict";
//  https://restcountries.com/v3.1/all
const brightness = document.querySelector(".brightness");
const main = document.querySelector("main");
const countryList = document.querySelector(".country__list");

const showCountries = (arr) => {
  arr.forEach(obj => {
    const country = document.createElement("li");
    //   countryList.innerHTML = "";
    country.classList.add("country__list__item");
    console.log(obj);
    country.innerHTML = `<img src="${obj.flags.svg}">
    <h2>${obj.name.common}</h2>
    `;
    countryList.appendChild(country)
  })
};

async function findCountry(){
 const response = await fetch( 'https://restcountries.com/v3.1/all')
 const countries = await response.json()
 console.log(countries);
 showCountries(countries)
}

findCountry()