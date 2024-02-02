"use strict";

export class Countries {
  constructor() {
    this.allCountries = [];
    this.countries = [];
  }
  addCountries(country) {
    this.countries.push(country);
  }
  setCountries(countries) {
    this.countries = countries;
  }

  setAllCountries(countries) {
    this.allCountries = countries;
  }

  getAllCountries() {
    return this.allCountries;
  }

  getCountries() {
    return this.countries;
  }
}
