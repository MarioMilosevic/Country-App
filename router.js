"use strict";

class Router {
  constructor() {}

  init() {
    history.pushState({ homePage: "Home Page" }, null, "/");
  }

  go(route) {
    history.pushState({ route }, "", route);
  }
}

export default Router;
