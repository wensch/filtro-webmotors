import PubSub from "pubsub-js"
PubSub.subscribe("OPEN_MODAL", openModal)

let modal = document.querySelector('.modal-information')
let btnClose = modal.querySelector('.close-modal')
let overlay = modal.querySelector('.overlay')

function openModal() {
  modal.classList.add('-show')  
}

function closeModal(el) {
  el.closest('.modal-information').classList.remove('-show')
}

btnClose.addEventListener('click', e => {
  closeModal(e.target)
})
overlay.addEventListener('click', e => {
  closeModal(e.target)
})