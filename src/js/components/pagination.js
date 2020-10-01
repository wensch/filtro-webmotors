import PubSub from "pubsub-js"

let pagination = document.querySelector('.pagination')
let itemPagination = pagination.querySelectorAll('.pagination-item')
let btnDecrement = pagination.querySelector('.pagination-item-decrement')
let btnIncrement = pagination.querySelector('.pagination-item-increment')
let loading = document.querySelector('.loading')

function scrollTop() {
  let carsHolder = document.querySelector('.list-cars')
  window.scrollTo({
    top: carsHolder.offsetTop - 80,
    left: carsHolder.offsetLeft,
    behavior: 'smooth'
  });
}

function clearAllClass() {
  itemPagination.forEach(element => {
    element.classList.remove('-active')
  });
}

function showLoading() {
  loading.classList.add('-active')
}

itemPagination.forEach(element => {
  element.addEventListener('click', e => {
    let value = element.textContent
    scrollTop()
    showLoading()
    clearAllClass()

    element.classList.add('-active')
    PubSub.publish('CHANGE_PAGINATION', value)
  })
});

btnDecrement.addEventListener('click', e => {
  let value = ''
  
  itemPagination.forEach(element => {
    if (element.classList.contains('-active')) value = element.getAttribute('data-value')
  })
  let valueDecrement = value - 1
  if (value == '1') return
  
  clearAllClass()
  scrollTop()
  document.querySelector(`[data-value='${valueDecrement}']`).classList.add('-active')
  
  PubSub.publish('CHANGE_PAGINATION', valueDecrement)
})

btnIncrement.addEventListener('click', e => {
  let value = ''
  
  itemPagination.forEach(element => {    
    if (element.classList.contains('-active')) value = element.textContent
    value = parseInt(value)
    
    if (element.textContent == (value + 1)) {
      clearAllClass()
      element.classList.add('-active')
    }
  })
  let valueIncrement = value + 1
  if (value == '3') return
  
  scrollTop()
  showLoading()
  PubSub.publish('CHANGE_PAGINATION', valueIncrement)
})