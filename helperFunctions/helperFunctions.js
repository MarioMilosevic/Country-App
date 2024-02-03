"use strict";
import { countryList, darkMode, brightnessImg, brightnessText } from "../main";
import { countries } from "../main";
export const showCountries = (arr) => {
  arr.forEach((obj) => {
    const country = document.createElement("li");
    country.classList.add("country__list__item");
    country.innerHTML = `<img src="${obj.flags.svg}">
      <h2>${obj.name.common}</h2>
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
  }
};

export const toggleCountryAppLogo = (img) => {
  const lightImg = "./public/img/planet-earth-light.jpg";
  const darkImg = "./public/img/planet-earth-dark.jpg";
  img.src = darkMode.getDarkMode() ? darkImg : lightImg;
};

export const toggleLiBackgroundColor = (arr) => {
  const shadow = "rgba(149, 157, 165, 0.2) 0px 8px 24px";
  arr.forEach((li) => {
    li.style.backgroundColor = darkMode.getDarkMode() ? "#1f2937" : "#fff";
    li.style.boxShadow = darkMode.getDarkMode() ? "none" : shadow;
    li.firstElementChild.style.boxShadow = darkMode.getDarkMode()
      ? "none"
      : shadow;
  });
};

export const toggleBrightnessImg = () => {
  const light = "./public/img/sun.jpg";
  const dark = "./public/img/moon.png";
  brightnessImg.src = darkMode.getDarkMode() ? dark : light;
};

export const toggleBrightnessText = () => {
  brightnessText.textContent = darkMode.getDarkMode()
    ? "Dark Mode"
    : "Light Mode";
};
