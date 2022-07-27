import { registerApplication, start, addErrorHandler, getAppStatus, LOAD_ERROR } from 'single-spa';
import { constructApplications, constructRoutes, constructLayoutEngine } from 'single-spa-layout';
import layout from './microfrontends-layout.html';

// import * as isActive from "./activity-functions";

let errorMsg = '';

addErrorHandler(err => {
  if (getAppStatus(err.appOrParcelName) === LOAD_ERROR) {
      System.delete(System.resolve(err.appOrParcelName));
  }
  let el = document.getElementById("content");
  errorMsg = "<h1>We're sorry!</h1>" + "<h4>Your request could not be completed at this time. Please try again later.</h4>";
  el.innerHTML = errorMsg;
  // document.body.appendChild(el);
  console.log('Error loading app. ', err);
});


window.addEventListener('single-spa:before-app-change', evt => {
  let el = document.getElementById("content");
  errorMsg = ''
  el.innerHTML = errorMsg;
});


// Parse our microfrontend layout
const routes = constructRoutes(layout);

// Create single-spa application objects for each microfrontend
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  }
});

// Create a layout engine, which controls where in the DOM the microfrontends are placed
const layoutEngine = constructLayoutEngine({ routes, applications });

// Register our applications with single-spa
applications.forEach(registerApplication);

// Start up single-spa
start();




// // routes without layout engine

// registerApplication(
//   "@actionanand/single-spa-nav",
//   () => System.import("@actionanand/single-spa-nav"),
//   isActive.nav
// );

// registerApplication({
//   name: "@actionanand/single-spa-react",
//   app: () => System.import("@actionanand/single-spa-react"),
//   activeWhen: [(location) => location.pathname === '/']
// });

// registerApplication(
//   "single-spa-angular",
//   () => System.import("single-spa-angular"),
//   isActive.angular
// );

// registerApplication(
//   "@actionanand/single-spa-vue",
//   () => System.import("@actionanand/single-spa-vue"),
//   isActive.vue
// );

// start({
//   urlRerouteOnly: true
// });


// // some other way

// registerApplication(
//   "@actionanand/single-spa-react",
//   () => System.import("@actionanand/single-spa-react"),
//   isActive.react
// );

// registerApplication({
//   name: "@actionanand/single-spa-nav",
//   app: () =>
//     System.import("@actionanand/single-spa-nav"),
//   activeWhen: ["/"],
// });

// registerApplication({
//   name: "@actionanand/single-spa-react",
//   app: () => System.import("@actionanand/single-spa-react"),
//   activeWhen: ['/react', (location) => location.pathname.startsWith('/react')],
// });

// registerApplication({
//   name: "@single-spa/welcome",
//   app: () =>
//     System.import(
//       "https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js"
//     ),
//   activeWhen: ["/"],
// });