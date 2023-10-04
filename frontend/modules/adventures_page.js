
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let abc=new URLSearchParams(search);
  return abc.get('city');

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  let urlAdv=`${config.backendEndpoint}/adventures/?city=${city}`
  try{
  let adv=await fetch(urlAdv);
  let dev=await adv.json();
  return dev;
  }
  catch(err){
    return null;
  }
  
}

async function wowo(){
  let yoyo = getCityFromURL(window.location.search);
  let jaja= await fetchAdventures(yoyo)
  return jaja;
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures){
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  function createCards(id, category, image, name, costPerHead, duration){
    let card=document.getElementById('data');
    let createCard=document.createElement('div');
    createCard.className="col-6 col-lg-3 mt-4";
    createCard.innerHTML=`<div class="card activity-card">
    <a href="detail/?adventure=${id}" id=${id}>
    <div class="category-banner">
    ${category}
    </div>
    <img class="card-img-top" src=${image} alt="Card image cap">
    <div class="card-txt">
      <h5>${name}</h5>
      <h5>₹${costPerHead}</h5>
    </div>
    <div class="card-txt">
      <h5>Duration</h5>
      <h5>${duration} hours</h5>
    </div>
    </div>
    </a>`
    card.append(createCard);  
  }
  
  if(adventures){
    adventures.forEach((key)=>{
       createCards(key.id,key.category, key.image, key.name, key.costPerHead, key.duration)
    })
  }
}






//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
   let ans=list.filter(durationFil);
   
   function durationFil(key){
    return (key.duration>=low && key.duration<=high);
   }
   return ans;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let filtCat=[]; 
  filtCat = list.filter(adventure => categoryList.includes(adventure.category))
  return filtCat;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together


function filterFunction(list, filters){
   let a;
   let b;
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
   if(filters.category.length>0 && filters.duration!=""){
     let indexOfDash=filters.duration.indexOf("-");
     let low=filters.duration.slice(0, indexOfDash);
     let high=filters.duration.slice(indexOfDash+1);
     a=filterByCategory(list, filters.category);
     b=filterByDuration(a,low,high);
     return b;
   }
 

   else if(filters.category.length>0){
     a=filterByCategory(list, filters.category);
     return a;
   }

   else if(filters.duration!=""){
     let indexOfDash=filters.duration.indexOf("-");
     let low=filters.duration.slice(0, indexOfDash);
     let high=filters.duration.slice(indexOfDash+1);
     console.log(low,high);
     a=filterByDuration(list, low, high);
     return a;
   }
   else{
    return list;
   }

  }
  // Place holder for functionality to work in the Stubs
  


//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  return localStorage.setItem('filters', JSON.stringify(filters));
  
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  return JSON.parse(localStorage.getItem('filters'));
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

async function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let disCat=document.getElementById("category-list");
  if(filters.category.length>=1){
   for(let i=0;i<filters.category.length;i++){
    let disCat1=document.createElement('span');
    disCat1.className='category-filter';
    disCat1.innerHTML=`${filters.category[i]}
    <button type="button" class="btn-close" id=${filters.category[i]} aria-label="Close"></button>`;
    disCat.append(disCat1);
  }
  }
}
 
async function popPills(filters){

  let bobo=await wowo();
  let abc=document.querySelectorAll(".category-filter");
  abc=Array.from(abc);
 
  abc.forEach(function(ev){
    ev.addEventListener("click", function(e){
      let fafa=(e.target.id);
      console.log(fafa);
      let abclength=abc.length;

      function findInd(){
      for(let i=0;i<abclength;i++){
        let hahaha=abc[i].textContent;
        let nanana=hahaha.trim();
        if(nanana==fafa){
           return i;
        }
      }
    }
    
    let foundInd=findInd();
    abc.splice(foundInd,1);
    

    filters.category=[];
    let temp;
    let temp1;
    for(let a=0;a<abc.length;a++){
      temp=abc[a].textContent;
      temp1=temp.trim();
      filters["category"].push(temp1);
    }
    document.getElementById("data").textContent = "";
    document.getElementById("category-list").textContent=""
    let disCat=document.getElementById("category-list");
    for(let i=0;i<abc.length;i++){
      let disCat1=document.createElement('span');
      disCat1.className='category-filter';
      disCat1.innerHTML=`${filters.category[i]}
      <button type="button" class="btn-close" id=${filters.category[i]} aria-label="Close"></button>`;
      disCat.append(disCat1);
  }
       let filteredAdventures = filterFunction(bobo, filters); 
       addAdventureToDOM(filteredAdventures);
  })
})
}




export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
  popPills,
};
