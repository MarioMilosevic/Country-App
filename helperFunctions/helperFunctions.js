'use strict'
import { countryList } from "../main";
export const showCountries = (arr) => {
    arr.forEach(obj => {
      const country = document.createElement("li");
      //   countryList.innerHTML = "";
      country.classList.add("country__list__item");
      country.innerHTML = `<img src="${obj.flags.svg}">
      <h2>${obj.name.common}</h2>
      `;
      countryList.appendChild(country)
    })
  };