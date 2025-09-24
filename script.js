const locationInput = document.querySelector('.main-form');
const cardBody = document.querySelector('.card-body') 
const apiKey = 'zpka_61589b7bb029491c989d0c1b74c6d69c_cf954c4e'

locationInput.addEventListener('submit', e=>{
    e.preventDefault()
    console.log(e.target.childNodes[1].value)
    getWeather(apiKey, e.target.childNodes[1].value)
})

let cityName = null





const getWeather = (apiKey, city)=>{
    fetch(`https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${city}`)
.then(res=>{
    return res.json()
}).then(data=>{
    cityName = data[0].AdministrativeArea.EnglishName
    console.log(data[0])

    fetch(`https://dataservice.accuweather.com/forecasts/v1/hourly/1hour/${data[0].Key}?apikey=${apiKey}&metric=true`)
.then(res=>{
    return res.json()
}).then(data=>{
    console.log(data[0])

      let weatherTemplate = `
      <img src="/Weather-icons/${data[0].WeatherIcon}.png" alt="_____">
      <h1 class="card-title weather-info">${data[0].IconPhrase}</h1>
      <h2 class="card-subtitle mb-2 weather-info">${cityName}</h2>
       <h1 class="card-text weather-info">${data[0].Temperature.Value}c</h1>
`

     cardBody.innerHTML = weatherTemplate

})
})
}
