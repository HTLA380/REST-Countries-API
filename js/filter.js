// filter country using user input
let userInput = document.querySelector(".search-input");

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  return;
});

userInput.addEventListener("input", (e) => {
  filterCountry(e.target.value)
});

function filterCountry(value) {
  let countryName = document.querySelectorAll('.card-title')
  countryName.forEach(name => {
    if(name.innerText.toLowerCase().includes(value.toLowerCase())) {
      name.parentElement.parentElement.style.display = 'block'
    } else {
      name.parentElement.parentElement.style.display = 'none'
    }
  })
}

// filter by region
document.querySelectorAll(".region").forEach((region) => {
  region.addEventListener("click", () => {
    let regionBtn = document.querySelector(".drop-down-btn-text");
    
    // reseting the name
    if (regionBtn.innerHTML === region.innerHTML) return;
    regionBtn.innerHTML = region.innerHTML;
    getDataRegion(region.dataset.country);
  });
});

function getDataRegion(region) {
  fetch(`https://restcountries.com/v3.1/region/${region}`)
    .then((res) => res.json())
    .then((data) => generateCountry(data))
    .catch(() => showNotFoundError(true));
}
