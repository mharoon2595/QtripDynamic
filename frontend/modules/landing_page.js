import config from "../conf/index.js";
let urlCities=`${config.backendEndpoint}/cities`;


async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
  let cities= await fetch(urlCities);
  let res= await cities.json();
  return res;
  } 
  catch(err){
  return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let gettin=document.getElementById("data");
  let cityCards=document.createElement('div')
  cityCards.className="col-md-6 col-lg-3"
  cityCards.innerHTML=`<div class='tile'>
   <a href="pages/adventures/?city=${id}" id=${id}>
   <img src=${image} >
   <div class="tile-text">${city}<br>${description}</div>
   </a>
   </div>`
   gettin.append(cityCards);
}


export { init, fetchCities, addCityToDOM };
