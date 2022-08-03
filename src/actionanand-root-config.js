import { registerApplication, start, addErrorHandler, getAppStatus, LOAD_ERROR } from 'single-spa';
import { constructApplications, constructRoutes, constructLayoutEngine } from 'single-spa-layout';
import layout from './microfrontends-layout.html';

// import * as isActive from "./activity-functions";

let errorMsg = '';

const htmlLayoutData = {
  props: {
    customProp1: "coming from 'root-config'",
    customProp2: "I'm second custom prop"
  },
  loaders: {
    spaLoader: `<div class="spa-loader-wrap"><span class="spa-loader">Load&nbsp;ng</span></div>`,
  }
}

addErrorHandler(err => {
  if (getAppStatus(err.appOrParcelName) === LOAD_ERROR) {
      System.delete(System.resolve(err.appOrParcelName));
  }
  let el = document.getElementById("single-spa-load-error");
  errorMsg = `<div class="spa-err-msg"><div>We're sorry!</div><div>Your request could not be completed at this time. Please try again later.</div></div>`;
  el.innerHTML = errorMsg;
  // document.body.appendChild(el);
  console.log('Error loading app. ', err);
});


window.addEventListener('single-spa:before-app-change', evt => {
  let el = document.getElementById("single-spa-load-error");
  errorMsg = ''
  el.innerHTML = errorMsg;
});

window.addEventListener('vanilla', evnt => {
  console.log(evnt);
  navigateToUrl('svelte');
});


// Parse our microfrontend layout
const routes = constructRoutes(layout, htmlLayoutData);

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
