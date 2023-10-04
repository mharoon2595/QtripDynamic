import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let abc=new URLSearchParams(search);
  return abc.get('adventure')
  // Place holder for functionality to work in the Stubs
  
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  let urlAdv=`${config.backendEndpoint}/adventures/detail/?adventure=${adventureId}`
  try{
  let adv=await fetch(urlAdv);
  let dev=await adv.json(); 
  return dev;
  }
  catch(err){
    return null;
  }
  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  let mainH=document.getElementById("adventure-name");
  mainH.textContent=`${adventure.name}`;

  let subH=document.getElementById("adventure-subtitle");
  subH.textContent=`${adventure.subtitle}`;

  let addImages=document.getElementById("photo-gallery");
  addImages.innerHTML="";
  for(let i=0;i<adventure.images.length;i++){
  addImages.innerHTML+=`<div><img class="activity-card-image" src=${adventure.images[i]} alt="Card image cap"></div>`
  
  let addDesc=document.getElementById("adventure-content");
  addDesc.textContent=`${adventure.content}`;
}
}
//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let addImages=document.getElementById("photo-gallery");
  addImages.innerHTML=`<div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner" id="carousel-inner">
   <div class="carousel-item active">
    <img src=${images[0]} class="d-block w-100 activity-card-image" alt="ImageAlt">
   </div>
   </div>
   <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
<span class="carousel-control-prev-icon" aria-hidden="true"></span>
<span class="visually-hidden">Previous</span>
</button>
<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
<span class="carousel-control-next-icon" aria-hidden="true"></span>
<span class="visually-hidden">Next</span>
</button>
</div>`;
   
  let addToCarousel=document.getElementById("carousel-inner");
  for(let i=1;i<images.length;i++){
    addToCarousel.innerHTML+=`
    <div class="carousel-item">
    <img src=${images[i]} class="d-block w-100 activity-card-image" alt="ImageAlt">
    </div>`
  }
}

//Implementation of conditional rendering of DOM based on availability
async function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  //console.log()
  let checkAvailability=adventure.available;
  if(checkAvailability==true){
    document.getElementById("reservation-panel-sold-out").style.display="none";
    document.getElementById("reservation-panel-available").style.display="block"
    document.getElementById("reservation-person-cost").textContent=adventure.costPerHead;
  }
  else{
    document.getElementById("reservation-panel-available").style.display="none";
    document.getElementById("reservation-panel-sold-out").style.display="block";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let costPerHead=adventure.costPerHead;
  let numPeople=persons;
  let grandTotal=costPerHead*numPeople;
  document.getElementById("reservation-cost").textContent=grandTotal; 
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  let formElems=document.querySelector('#myForm');
  formElems.addEventListener("submit", async (e)=>{
    e.preventDefault();
    //console.log(formElems.elements);
    let {date, name, person}=formElems.elements;
    let obj={
      'name': name.value,
      'date': date.value,
      'person':person.value,
      'adventure': adventure.id
    };

    let url=`${config.backendEndpoint}/reservations/new`
    try{
    let response= await fetch(url, {
      method: 'POST',
      body: JSON.stringify(obj),
      headers:{'Content-type': 'application/json'}
    })
    let finalOut=await response.json();
    alert("Success");
    }
    catch(error){
      alert("Failed");
    }
})
}


//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved==true){
   document.getElementById("reserved-banner").style.display="block";
  }
  else{
    document.getElementById("reserved-banner").style.display="none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
