"use strict";
import { countryList } from "../main";
import { countries} from "../main";
export const showCountries = (arr) => {
  arr.forEach((obj) => {
    const country = document.createElement("li");
    country.classList.add('country__list__item')
     country.innerHTML = `<img src="${obj.flags.svg}">
      <h2>${obj.name.common}</h2>
      `;
    countryList.appendChild(country);
  });
};

export const findCountry = async function(url) {
  try {
    const response = await fetch(url);
    const returnedCountries = await response.json();
    return returnedCountries
  } catch (error) {
    console.log('Error fetching data:', error);
  }
}
