// theme changer
const body = document.querySelector("body");

function toggleTheme() {
  if (localStorage.getItem("theme") == "theme-dark") {
    changeTheme(body, true);
    changeIcon(true);
  } else {
    changeTheme(body, false);
    changeIcon(false);
  }
}

// to change the theme when the page get loaded
(function () {
  if (localStorage.getItem("theme") == "theme-dark") {
    changeTheme(body, false);
    changeIcon(false);
  } else {
    changeTheme(body, true);
    changeIcon(true);
  }
})();

function changeTheme(element, is_dark) {
  if (is_dark) {
    element.classList.remove("theme-dark");
    addClass("theme-light", element);
    localStorage.setItem("theme", null);
  } else {
    body.classList.remove("theme-light");
    addClass("theme-dark", element);
    localStorage.setItem("theme", "theme-dark");
  }
}

function changeIcon(is_dark) {
  const moonIcon = document.querySelector("#moon-icon");
  moonIcon.className = `fa-${is_dark ? "regular" : "solid"} fa-moon`;
}

function addClass(classname, element) {
  element.classList.add(classname);
}
