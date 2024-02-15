'use strict'

import { darkMode,brightnessImg,brightnessText } from "../main";
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