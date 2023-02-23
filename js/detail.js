let mainContainer =  document.querySelector('main')
let is_menu_display = false;
// for detail page
function getDetailData(name) {
  if(!is_menu_display) {
    is_menu_display = true;
    fetch(`https://restcountries.com/v3/name/${name}?fullText=true`)
      .then((res) => res.json())
      .then((data) => {
        showAnimation()
        setTimeout(async () => {
          if(!data_ready) return;
  
          mainContainer.classList.add("d-none")
          showAnimation()

          setTimeout(generateCountryDetail(data), 300)    

          // remove the menu if it's open
          document.getElementById("menu").classList.add('d-none')

         // preventing from getting multiple detail element
         is_menu_display = false;

          // to scroll the page to the top
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
      }, 400)
      })
      .catch((err) => {
        console.log(err)
        showNotFoundError(false)
      }); 
  }
}

// changing country shot name into long name
const countryDetailContainer = document.querySelector(".detail-container")

function generateCountryDetail(data) {
  if(data.status === 404) return;
  data = data[0]
    countryDetailContainer.innerHTML = `
    <button class="detail-btn border-0" onclick="closeDetail()">
    <i class="fa-solid fa-arrow-left"></i>
    <p class="d-inline-block nav-link ms-2">Back</p>
  </button>
  <div class="d-lg-flex justify-content-between align-items-center">
    <div class="img-container px-2 py-5">
      <img src="${data.flags[0]}" class='detail-img' id='img-${data.name.common}' alt="" />
    </div>
    <div class="country-detail-container">
    <h3 class="country-detail-title fw-bolder">${data.name.common}</h3>
    <div class='d-lg-flex justify-content-between mt-4 align-items-start'>
      <div class="me-4 me-md-2 fw-medium detail-text-container">
        <p class="card-text mb-2">
          Native Name: <span class="fw-normal">${data.name.nativeName ? getNativeName(data) : data.name.common}</span>
        </p>
        <p class="card-text mb-2">
          Population: <span class="fw-normal"> ${data.population.toLocaleString()}</span>
        </p>
        <p class="card-text mb-2">
          Region: <span class="fw-normal"> ${data.region}</span>
        </p>
        <p class="card-text mb-2">
          Capital: <span class="fw-normal"> ${data.capital ? data.capital : 'none'}</span>
        </p>
      </div>
      <div class="fw-medium detail-text-container mt-3 mt-lg-0">
        <p class="card-text mb-2">
          Top Level Domain: <span class="fw-normal">${data.tld[0]}</span>
        </p>
        <p class="card-text mb-2">
          Currencies: <span class="fw-normal"> ${data.currencies ? showCurrencies(data.currencies) : 'none'}</span>
        </p>
        <p class="card-text mb-2">
          Languages: <span class="fw-normal"> ${data.languages ?  Object.values(data.languages) : 'none'}</span>
        </p>
      </div>
    </div>
    <div class="border-country-container mt-5 mt-md-3 d-md-flex justify-content-start align-items-baseline">
      <h1 class="country-detail-title mb-3 mb-md-0">Border Countries:</h1>
      <div class="ms-3 d-flex flex-wrap justify-content-start align-items-center">
        ${convertName(data.borders)}
      </div>
    </div>
    </div>
  </div>
  `

  changeSvgToPng('img-Nepal', data.flags[1])
}

function getNativeName(data) {
  let key = Object.keys(data.languages)[0]
  return data.name.nativeName[key]['common']
}

function showCurrencies(data) {
  let key = Object.keys(data)
  let result = [];
  if(key.length > 1) {
    key.forEach(x => result.push(data[x]['name']))
    return result.join(", ")
  }
  return data[key]['name']
}

function convertName(data) {
  let name = '';
  if(data) {
    const regionNamesInEnglish = new Intl.DisplayNames(['en'], { type: 'region' });

    data.forEach(country => {
      country = country.substring(0, 2); 
      let fullname = regionNamesInEnglish.of(country)
      name += `
      <button class="detail-btn border-0" onclick="getDetailData('${fullname}')">${fullname}</button>
      `
    })

  }else{
    name += `
    <button class="detail-btn border-0">None</button>`
  } 
  return name
}

function closeDetail() {
  countryDetailContainer.innerHTML = ''
  mainContainer.classList.remove("d-none")
}

function changeSvgToPng(element, png) {
  if(document.getElementById(`${element}`) === null) return
  document.getElementById(`${element}`).src = png
}