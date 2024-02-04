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
    const b = input * 25;
    const a = b - 25;
    const customArr = this.countries.slice(a, b);
    return customArr;
  }

  sortCountries() {
    return this.countries.sort((a, b) => {
      a.name.common.localeCompare(b.name.common);
    });
  }
  //da uzme broj iz argumenta, i asignuje prvi, a taj prvi pomnozi sa drugim
  //                                  iz argumenta da uzme vrijednost i pomnozi sa 25 tako drugi broj
  // get25Countries(a) {
  //   if (a === 1) {
  //     const first25dArray = this.countries.slice(0, 25);
  // }
}
