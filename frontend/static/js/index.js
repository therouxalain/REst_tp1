//6 load view
import Accueil from "./views/Accueil.js";
import Articles from "./views/Articles.js";
import Nouvelle from "./views/Nouvelle.js";
import UnArticle from "./views/Nouvelle.js";

const pathToRegex = (path) =>
  new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = (match) => {
  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
    (result) => result[1]
  );

  return Object.fromEntries(
    keys.map((key, i) => {
      return [key, values[i]];
    })
  );
};

//4 recuperer le pathname
const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

// 1 router
const router = async () => {
  const routes = [
    { path: "/", view: Accueil },
    { path: "/articles", view: Articles },
    { path: "/nouvelle", view: Nouvelle },
  ];

  //2 match function
  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      result: location.pathname.match(pathToRegex(route.path)),
    };
  });
  console.log(potentialMatches);

  //3
  //   let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch)
  let match = potentialMatches.find(
    (potentialMatch) => potentialMatch.result !== null
  );

  if (!match) {
    match = {
      route: routes[0],
      result: [location.pathname],
    };
  }
  //console.log(match.result)
  //console.log(match.route.view())

  //7 instance de la classse
  const view = new match.route.view(getParams(match));
  console.log(view);
  document.querySelector("#app").innerHTML = await view.getHtml();
};

//8 history
window.addEventListener("popstate", router);

//5
document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });
  router();
});
