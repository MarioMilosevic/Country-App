"use strict";

export class Router {
  constructor() {}

  init() {
    if (!window.location.href.includes("firstPage")) {
      window.location.href = "firstPage";
      console.log(history);
      console.log(window.location);
    } else {
      return;
    }
  }

  go(route) {
    history.pushState({ route }, "", route);
  }

}
