let data_ready = false;

const countriesContainer = document.querySelector(".countries-container");
// to show country menu when it's clicked
function showCountryMenu(className) {
  document.querySelector(`.${className}`).classList.toggle("d-none");
}


//fetch all the country data
function getCountryData() {
  fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => generateCountry(data))
    .catch(() => showNotFoundError(false));
}

// generateCountry
function generateCountry(countriesData) {
  showAnimation();
  setTimeout(() => {
    countriesContainer.innerHTML = "";
    countriesData.forEach((data) => {
      countriesContainer.innerHTML += `
          <div class="card country border-0 mx-md-3 mb-5" onclick="getDetailData('${data.name.common}');">
          <img
            src="${data.flags.png}"
            class="card-img-top"
            alt="..."
          />
          <div class="card-body px-3 py-4">
            <h5 class="card-title fw-bold mb-3">${data.name.common}</h5>
            <div class="card-text card-body-text fw-semibold mb-2">
            <p>Population:</p><span class="fw-normal">${data.population.toLocaleString()}</span>
            </div>
            <div class="card-text card-body-text fw-semibold mb-2">
            <p>Region:</p>
            <span class="fw-normal"> ${data.region}</span>
            </div>
            <div class="card-text card-body-text fw-semibold">
            <p>Capital:</p>
            <span class="fw-normal"> ${data.capital ? data.capital.join(", ") : 'none'}</span>
            </div>
          </div>
        </div>`;
    });
    data_ready = true
  }, 300);
}

// show animation when the county got generated
function showAnimation() {
  let loader = document.querySelector(".loading-animation");
  loader.classList.add("active-animation");

  setTimeout(() => {
    loader.classList.remove("active-animation");
  }, 500);
}

// show error when the user input is invalid
function showNotFoundError(is_homePage) {
  countriesContainer.innerHTML = `
  <div class="show-error">
  <img src="./robot-error.svg" alt="" />
  <div class="error-message text-center">
    <h2 class="fw-light mb-1">
    ${is_homePage ? "404 Not Found" : "Please Check Your Internet Connection"}
    </h2>
    ${
      is_homePage
        ? "<p>Please Type a vaild country name or check spelling</p>"
        : ""
    }
  </div>
  `;
}

getCountryData()
