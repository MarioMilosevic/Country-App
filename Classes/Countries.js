"use strict";

export class Countries {
  constructor() {
    this.countries = [];
  }
  addCountries(country) {
    this.countries.push(country);
  }
  setCountries(countries) {
    this.countries = countries;
  }

  getCountries() {
    return this.countries;
  }

  get25Countries(input) {
    const b = input * 24;
    const a = b - 24;
    const customArr = this.countries.slice(a, b);
    return customArr;
  }

  sortCountries() {
    this.countries.sort((a, b) => {
      return a.name.common.localeCompare(b.name.common);
    });
  }
}
