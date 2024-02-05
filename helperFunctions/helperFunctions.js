"use strict";
import {
  countryList,
  darkMode,
  brightnessImg,
  brightnessText,
  pageNumbersList,
  firstPageBtn
} from "../main";
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

export const pageButtons = (arr, list) => {
  const length = arr.length;
  const totalButtons = length / 24;
  for (let i = 0; i < totalButtons; i++) {
    const button = document.createElement("button");
    button.classList.add("listBtn");
    button.id = i + 1;
    button.textContent = i + 1;
    list.appendChild(button);
  }
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

export const togglePageNumbersColor = (buttons) => {
  buttons.forEach((btn) => {
    btn.style.backgroundColor = darkMode.getDarkMode() ? "#1f2937" : "#fff";
    btn.style.color = darkMode.getDarkMode() ? "#ffffff" : "#000000";
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

export const lightButton = (element) => {
  element.style.backgroundColor = "#fff";
  element.style.color = "#000";
};

export const darkButton = (element) => {
  element.style.backgroundColor = "#1f2937";
  element.style.color = "#fff";
};

export const pageClickedHandler = (target) => {
  firstPageBtn.classList.remove("clickedDark");
  const allPageBtns = document.querySelectorAll(".listBtn");
  allPageBtns.forEach((btn) => {
    btn.classList.remove("clicked");
    darkMode.getDarkMode() ? darkButton(btn) : lightButton(btn);
  });
  
  target.classList.add("clicked");
  darkMode.getDarkMode() ? lightButton(target) : darkButton(target);
};
