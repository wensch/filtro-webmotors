import PubSub from "pubsub-js"

async function fetchAPI(params) {
  let response = await fetch(`http://desafioonline.webmotors.com.br/api/OnlineChallenge/${params}`)
  response = await response.json()
  return response
}

fetchAPI(`Vehicles?Page=1`).then(res => PubSub.publish("GET_CARS", res))
fetchAPI('Make').then(res => PubSub.publish("GET_MAKE", res))

PubSub.subscribe("SET_MAKE_IN_MODEL", (topico, data) => {
  fetchAPI(`Model?MakeID=${data}`).then(res => PubSub.publish("GET_MODEL", res))
})
PubSub.subscribe("SET_MODEL_IN_VERSION", (topico, data) => {
  fetchAPI(`Version?ModelID=${data}`).then(res => PubSub.publish("GET_VERSION", res))
})

PubSub.subscribe("CHANGE_PAGINATION", (topico, val) => {
  fetchAPI(`Vehicles?Page=${val}`).then(res => PubSub.publish("GET_CARS", res))
})