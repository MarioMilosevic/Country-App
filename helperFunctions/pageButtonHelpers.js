"use strict";
import { firstPageBtn, darkMode } from "../main";
import { darkElement,lightElement } from "./colorHelpers";

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
  const pageBtn = document.querySelector('.listBtn')
  pageBtn.classList.add("clickedDark", "clicked");
};


export const pageClickedHandler = (target) => {
  firstPageBtn.classList.remove("clickedDark");
  const allPageBtns = document.querySelectorAll(".listBtn");
  allPageBtns.forEach((btn) => {
    btn.classList.remove("clicked");
    darkMode.getDarkMode() ? darkElement(btn) : lightElement(btn);
  });
  
  target.classList.add("clicked");
  darkMode.getDarkMode() ? lightElement(target) : darkElement(target);
};

export const toggleAllPageNumbersColor = (buttons) => {
  buttons.forEach((btn) => {
    btn.style.backgroundColor = darkMode.getDarkMode() ? "#1f2937" : "#fff";
    btn.style.color = darkMode.getDarkMode() ? "#ffffff" : "#000000";
  });
};

export const togglePageNumbersColor = () => {
  const renderedPageButtons = document.querySelectorAll('.listBtn')
  toggleAllPageNumbersColor(renderedPageButtons);
  const selectedPageBtn = document.querySelector(".clicked");
  darkMode.getDarkMode()
    ? lightElement(selectedPageBtn)
    : darkElement(selectedPageBtn);
}