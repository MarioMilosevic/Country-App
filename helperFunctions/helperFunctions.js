"use strict";
import {
  countryList,
  pageList,
  darkMode,
  brightnessImg,
  brightnessText,
  firstPageBtn,
  countries,
  main,
  searchBarContainer,
  renderedCountry,
  countryApp,
  router,
} from "../main";
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

export const renderPageButtons = (arr, list) => {
  list.innerHTML = "";
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
  const lightImg = "./img/planet-earth-light.jpg";
  const darkImg = "./img/planet-earth-dark.jpg";
  img.src = darkMode.getDarkMode() ? darkImg : lightImg;
};

export const goBackLight = (element) => {
  element.style.backgroundColor = "#ffffff";
  element.style.color = "#000000";
};

export const goBackDark = (element) => {
  element.style.backgroundColor = "#1f2937";
  element.style.color = "#fff";
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
  const light = "./img/sun.jpg";
  const dark = "./img/moon.png";
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

export const showCountryInformation = (list, obj) => {
  const firstCurrency = Object.values(obj.currencies)[0];
  const firstLanguage = Object.values(obj.languages)[0];
  list.innerHTML = "";
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
  <p>Languages: ${firstLanguage}</p>
  <p>Area: ${obj.area} km<sup>2</sup></p>
  <p>Population: ${obj.population.toLocaleString()}</p>
  <p>Capital: ${obj.capital}</p>
  <p>Currency: ${firstCurrency.name} </p>
  
  </div>
  
  </div>

  </div>
  `;
  list.appendChild(country);
  const goBackBtn = country.querySelector(".return__information__children");
  goBackBtn.addEventListener("click", showPreviousCountries);
  countryApp.addEventListener("click", showPreviousCountries);
};

export const showPreviousCountries = (e) => {
  console.log(window.location.href);
  // window.location.href = "mario"
  history.pushState({ page: 1 }, "First page", "firstPage");
  showCountries(countries.getCountries());
  countryList.style.display = "grid";
  searchBarContainer.style.display = "flex";
  pageList.style.display = "grid";
  renderedCountry.style.display = "none";
  console.log(history);
  console.log(window.location);
};

export const showCountry = async (e) => {
  const target = e.target.closest(".country__list__item");
  const countryName = target.querySelector("h2").textContent;
  const [countryObj] = await findCountry(
    `https://restcountries.com/v3.1/name/${countryName}`
  );
  const countryCode = countryObj.cca3;
  router.go(countryCode);
  countryList.style.display = "none";
  searchBarContainer.style.display = "none";
  pageList.style.display = "none";
  renderedCountry.style.display = "block";
  showCountryInformation(renderedCountry, countryObj);
  console.log(history);
  console.log(window.location);
};

export const debounce = (cb, delay = 1000) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  };
};
export const updateDebounceText = debounce((cb) => {
  cb()
}, 500);

// countrySearch.addEventListener("input", function () {
//   updateDebounceText(countrySearch.value);
// });

