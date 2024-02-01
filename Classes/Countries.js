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
}
