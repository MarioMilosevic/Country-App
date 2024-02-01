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

countryRegion.addEventListener("change",async function () {
  const region = countryRegion.value;
  countryList.innerHTML = "";
  const countries = await findCountry(`https://restcountries.com/v3.1/region/${region}`);
  console.log(countries);
});

countrySearch.addEventListener("input", function () {
  console.log("radi");
});

// searchBar.addEventListener("input", function () {
//   const friends = mainUser.getFriendsArr();
//   const search = searchBar.value.toLowerCase();
//   const friend = friends.filter(({ name, lastName }) => {
//     const fullName = `${name} ${lastName}`.toLowerCase();
//     return fullName.toLowerCase().includes(search);
//   });
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
