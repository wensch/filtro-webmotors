let listCars = document.querySelector('.list-cars')
let loading = document.querySelector('.loading')

PubSub.subscribe("GET_CARS", (topico, data) => getAllContent(data))

function getAllContent(data) {
  window.OBJ = data
  let cars = ''

  data.forEach(el => (
    cars += `
    <div class="car">
<div class="car-image-holder">
  <img src="${el.Image}" alt="" class="car-image">
</div>
<div class="car-content">
  <strong class="car-title -${el.Color}">${el.Make} <span class="car-model">${el.Model}</span></strong>
  <span class="car-info -version">${el.Version}</span>
  <span class="car-info">${el.KM}KM</span>
  <span class="car-info">${el.YearFab} / ${el.YearModel}</span>
  <span class="car-info -price">R$ ${el.Price}</span>
</div>
</div>`));
  
  loading.classList.remove('-active')
  listCars.innerHTML = cars
}