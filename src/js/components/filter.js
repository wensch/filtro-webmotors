import PubSub from "pubsub-js"

//Elementos htmls
let form = document.querySelector('[data-component="form"]')
let allSelects = form.querySelectorAll('select')
let selectMake = form.querySelector('#make')
let selectModel = form.querySelector('#model')
let selectVersion = form.querySelector('#version')
let selectYear = form.querySelector('#ano')
let selectPrice = form.querySelector('#preco')
let btnClear = form.querySelector('#limpar-filtro')
let btnSubmit = form.querySelector('#btn-submit')

// Variaveis globais
let arrOptions = []

// Subscribes
PubSub.subscribe("GET_MAKE", (topico, data) => init(data, selectMake))
PubSub.subscribe("GET_MODEL", (topico, data) => init(data, selectModel))
PubSub.subscribe("GET_VERSION", (topico, data) => init(data, selectVersion))

// Funcions
function init(data, el) {
  createOption(data)
  insertOptions(el, arrOptions)
  arrOptions = []
}

function createOption(arr) {
  arr.forEach(element => {
    let option = document.createElement('option')
    option.value = element.ModelID || element.ID
    option.text = element.Name
    arrOptions.push(option)
  });
  return arrOptions
}

function insertOptions(el, arr) {
  clearOptions(el)
  activeSelect(el)
  arr.forEach(element => {
    el.appendChild(element)
  });
}

function clearOptions(el) {
  if (el.querySelectorAll('option')) {
    el.querySelectorAll('option:not(:first-child)').forEach(element => {
      element.remove()
    });
  }
}

function activeSelect(el) {
  el.closest('.form-select-group').classList.add('-active')
}

function modifyFilters(val) {
  let arrOptionsYear = []
  let arrOptionsPrice = []
  let obj = window.OBJ
  let objFiltered = obj.filter(el => {
    return el.Make == val
  })
  filterPrice(objFiltered, arrOptionsPrice)
  filterYear(objFiltered, arrOptionsYear)
}

function filterYear(obj, arr) {
  obj.forEach(element => {
    let option = document.createElement('option')
    option.value = element.YearModel
    option.text = element.YearModel
    arr.push(option)
  });
  arr.forEach((element, i) => {
    if (arr.length >= 2 && element.value == element.value) arr.splice(i - 1, 1)
  });

  activeSelect(selectYear)
  insertOptions(selectYear, arr)
}

function filterPrice(obj, arr) {
  obj.forEach(element => {
    let option = document.createElement('option')
    option.value = element.Price
    option.text = 'R$' + element.Price
    arr.push(option)
  });
  arr.forEach((element, i) => {
    if (arr.length >= 2 && element.value == element.value) arr.splice(i - 1, 1)
  });

  activeSelect(selectPrice)
  insertOptions(selectPrice, arr)
}

function optionsValue(value, options) {
  let text = ''
  for (let index = 0; index < options.length; index++) {
    const el = options[index];
    if (el.value == value) text = el.text
  }
  return text
}

// Actions
selectMake.addEventListener('change', (e) => {
  let value = e.target.value
  let options = e.target.options
  modifyFilters(optionsValue(value, options))
  PubSub.publish("SET_MAKE_IN_MODEL", value)
})

selectModel.addEventListener('change', (e) => {
  PubSub.publish("SET_MODEL_IN_VERSION", e.target.value)
})

btnClear.addEventListener('click', (e) => {
  allSelects.forEach(element => {
    element.value = 0
    if (element.id != 'make') {
      clearOptions(element)
      element.closest('.form-select-group').classList.remove('-active')
    }
  });
})

btnSubmit.addEventListener('click', (e) => {
  let objValue = {}
  allSelects.forEach(element => {
    let options = element.options
    let name = element.name
    let value = element.value

    objValue[name] = optionsValue(value, options)
  });
  let objFiltered = window.OBJ.filter(el => {
    return el.Make == objValue.Make && el.Model == objValue.Model
  })

  PubSub.publish('OPEN_MODAL')
  console.log(objFiltered);
})