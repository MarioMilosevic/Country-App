"use strict";
import { showCountries, findCountry } from "./helperFunctions/helperFunctions";
import { Countries } from "./Classes/Countries";
//  https://restcountries.com/v3.1/all
const brightness = document.querySelector("#brightness");
const main = document.querySelector("main");
const countrySearch = document.querySelector("#country__search");
export const countryList = document.querySelector(".country__list");
const countryRegion = document.querySelector(".country__region");

export const countries = new Countries();

const fetchedCountries = await findCountry(
  "https://restcountries.com/v3.1/all"
);
countries.setCountries(fetchedCountries);
console.log(fetchedCountries);
showCountries(countries.getCountries());

countryRegion.addEventListener("change", async () => {
  const region = countryRegion.value;
  countryList.innerHTML = "";
  const urlAll = "https://restcountries.com/v3.1/all";
  const url = `https://restcountries.com/v3.1/region/${region}`;
  if (region === "All") {
    const responseAll = await findCountry(urlAll);
    countries.setCountries(responseAll);
    showCountries(responseAll);
  } else {
    const response = await findCountry(url);
    console.log(response);
    countries.setCountries(response);
    showCountries(response);
  }
});

countrySearch.addEventListener("input", function () {
  console.log("radi");
  const currentCountries = countries.getCountries();
  const search = countrySearch.value.toLowerCase();
  const searchedCountries = currentCountries.filter((country) =>
    country.name.common.toLowerCase().includes(search)
  );
  console.log(searchedCountries);
  countryList.innerHTML = "";
  showCountries(searchedCountries);
});

// searchBar.addEventListener("input", function () {
//   const friends = mainUser.getFriendsArr();
//   const search = searchBar.value.toLowerCase();
// const friend = friends.filter(({ name, lastName }) => {
//   const fullName = `${name} ${lastName}`.toLowerCase();
//   return fullName.toLowerCase().includes(search);
// });
//   if (friend) {
//     findFriend(searchResults, friend);
//     searchResults.classList.remove("hidden");
//   }
//   if (searchBar.value.length === 0) {
//     searchResults.classList.add("hidden");
//   }
// });

// export const findFriend = (list, person) => {
//   list.innerHTML = "";
//   person.forEach(p => {
//       const friendDiv = document.createElement("div");
//       friendDiv.classList.add("friend__search__div");
//       friendDiv.innerHTML = `<img src="${p.img}">
//       <p class="person__name">${p.name} ${p.lastName}</p>
//       `;
//       list.appendChild(friendDiv);
//     })
// };

//////////////////////////////////////////////////////////////////////////////////////////////////////
//  const route = (event) => {
//   event = event || window.event
//   event.preventDefault()
//   window.history.pushState({}, "", event.target.href)
// }

//  const routes = {
//   404: "/pages/404.html",
//   "/": "/pages/index.html",
//   "/about": "/pages/about.html",
//   "/lorem": "/pages/lorem.html"
// }

//  const handleLocation = async () => {
//   const path = window.location.pathname;
//   const route = routes[path] || routes[404]
//   const html = await fetch(route).then((data) => data.text())
//   document.getElementById('app').innerHTML = html
// }

// window.onpopstate = handleLocation
// window.route = route
// handleLocation()
