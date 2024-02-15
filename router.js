"use strict";

class Router {
  constructor() {}

  init() {
    history.pushState({homePage: "Home Page"}, null, "/")
    // if (!window.location.href.includes("firstPage")) {
    //   window.location.href = "firstPage";
    //   console.log(history);
    //   console.log(window.location);
    // } else {
    //   return;
    // }
  }

  go(route) {
    history.pushState({ route }, "", route);
  }
}

export default Router;
