"use strict";

export class Router {
  constructor() {}

  init() {
    if (!window.location.href.includes("?page=1")) {
      window.location.href = "?page=1";
    } else {
      return;
    }
  }

  go(route) {
    console.log(route);
    // console.log('aaaaaa');
    // const flag = route.flag ? route.flag : "?page=1"
    // console.log('aaaaaa');
    history.pushState({ route }, "", route);
  }

}
// export const router = {
//   init: () => {
//     // Event handler for url changes
//     window.addEventListener("popstate", (e) => {
//       console.log("pop");
//       router.go(e.state.route, false);
//       // Check the initial URL
//       // router.go(location.pathname);
//     });
//   },

//   go: (route) => {
//     console.log(route);
//     history.pushState({ route }, "", route);
//   },
// };

// const route2 = {

//     init: () = > {
//         router.go(url)

//     // Event handler for url changes
//     window.addEventListener("popstate", (e) => {
//       router.go(e.state.route, false);
//     })}

//     // Check the initial URL
//     router.go(location.pathname);
//   },

//   go: (route, addToHistory = true) => {
//     console.log(route);

//     if (addToHistory) {
//       history.pushState({ route }, "", route);
//     }

//     let pageElement = null;
//     let navigation = null;

//     if (route == "/") pageElement = new HomePage();
//     else if (route == "/sign-in") pageElement = new SignInPage();
//     else if (route == "/sign-in/factor-one") pageElement = new SignInPage();
//     else if (route == "/sign-up") pageElement = new SignUpPage();
//     else if (route == "/sign-up/verify-email-address")
//       pageElement = new SignUpPage();
//     else if (route == "/chatter") {
//       pageElement = new ChatterPage();
//       navigation = new Navigation();
//     } else {
//       pageElement = new HomePage();
//     }

//     if (pageElement) {
//       const cacheMain = document.querySelector("#cnt");

//       // clear dom before apending
//       if (cacheMain.children[0]) cacheMain.children[0].remove();

//       cacheMain.appendChild(pageElement);

//       window.scrollX = 0;
//       window.scrollY = 0;
//     }
//   },
// };

// const routes = {
//     '/': {
//       linkLabel: 'Home',
//       content: `I am in home page`
//     },
//     '/about': {
//       linkLabel: 'About',
//       content: `I am in about page`
//     },
//     '/friends': {
//       linkLabel: 'Friends',
//       content: `I am in friends page`,
//     },
//   };

// export class Router {
//   constructor(routes){
//     this.routes = routes
//     // this.initialRoute()
//   }

//   getCurrentUrl(){
//     const path = window.location.pathname
//     return path
//   }

//   matchUrlToRoute(urlSegs){
//     const matchedRoute = this.routes.find(route => route.path === urlSegs)
//     return matchedRoute
//   }

//   loadInitialRoute(){
//     const pathnameSplit = window.location.pathname.split('/')
//     const pathSegs = pathnameSplit.length > 1 ? pathnameSplit.slice(1) : "";

//     this.loadRoute(...pathSegs)
//   }

//   loadRoute(...urlSegs){
//     const matchedRoute = this.matchUrlToRoute(urlSegs)
//     if(!matchedRoute){
//       throw new Error('Route not found')
//     }
//     matchedRoute.callback()
//   }

//   navigateTo(path) {
//     window.history.pushState({}, '', path);
//     this.loadRoute(path);
//   }

// }

// export const routes = [
//     { path: '/', callback: () => console.log('Home page') },
//     { path: '/about', callback: () => console.log('About page') },
//   ];

// const route = (event) => {
//   event = event || window.event;
//   event.preventDefault();
//   window.history.pushState({}, "", event.target.href);
// };

// const routes = {
//   404: "/pages/404.html",
//   "/": "/pages/index.html",
//   "/about": "/pages/about.html",
//   "/lorem": "/pages/lorem.html",
// };

// const handleLocation = async () => {
//   const path = window.location.pathname;
//   const route = routes[path] || routes[404];
//   const html = await fetch(route).then((data) => data.text());
//   document.getElementById("app").innerHTML = html;
// };

// window.onpopstate = handleLocation;
// window.route = route;
// handleLocation();
