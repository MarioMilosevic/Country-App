"use strict";

export class DarkMode {
  darkMode;
  constructor() {
    this.darkMode = false;
  }
  toggleMode() {
    this.darkMode = !this.darkMode;
    return this.darkMode;
  }
  getDarkMode(){
    return this.darkMode
  }
}
