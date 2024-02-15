"use strict";
import { darkMode, brightnessImg, brightnessText, firstPageBtn } from "../main";

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
  cb();
}, 500);
