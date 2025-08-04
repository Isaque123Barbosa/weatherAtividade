const cityInput = document.getElementById("city-input");
const searchButton = document.getElementById("search-btn");
const weatherResultContainer = document.getElementById("weather-result");
const errorContainer = document.getElementById("error-message")

//Buscar os dados metereológicos

async function fetchClima(cityName) {
    try {
        const apiKey = '9a6f82bbc31f4a10965135114250308';
        const lowerCaseName = cityName.toLowerCase();
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lowerCaseName}&aqi=no&lang=pt`)

        if(!response.ok){
            throw new Error(`A cidade '${cityName}' não foi encontrada`)
        }

        const data = await response.json();
        renderCityData(data);

    } catch (error) {
        renderError(error.message)
    }
}

function renderCityData(city){
    weatherResultContainer.classList.remove("hidden");
    weatherResultContainer.innerHTML = '';
    
    const htmlInject = `
        <h2 id="city-name">${city.location.name}, ${city.location.country}</h2>
            <p id="local-time" class="local-time">Horário Local: ${city.location.localtime}</p>

            <div class="weather-main">
                <img id="weather-icon" src="${city.current.condition.icon}" alt="Ícone do tempo">
                <p id="temperature">${city.current.temp_c} C°</p>
            </div>
            <p id="condition">${city.current.condition.text}</p>

            <div class="weather-details">
                <div class="detail-item">
                    <span>Sensação</span>
                    <strong id="feels-like">${city.current.feelslike_c} C°</strong>
                </div>
                <div class="detail-item">
                    <span>Umidade</span>
                    <strong id="humidity">${city.current.humidity} %</strong>
                </div>
                <div class="detail-item">
                    <span>Vento</span>
                    <strong id="wind-speed">${city.current.wind_kph} km/h</strong>
                </div>
                <div class="detail-item">
                    <span>Pressão</span>
                    <strong id="pressure">${city.current.pressure_mb} mb</strong>
                </div>
                <div class="detail-item">
                    <span>Visibilidade</span>
                    <strong id="visibility">${city.current.vis_km} km</strong>
                </div>
                <div class="detail-item">
                    <span>Índice UV</span>
                    <strong id="uv-index">${city.current.uv}</strong>
                </div>
            </div>
    `
    weatherResultContainer.innerHTML = htmlInject;
}

function renderError(){
    weatherResultContainer.classList.add("hidden");
    errorContainer.classList.remove("hidden");
}

searchButton.addEventListener('click', () => {
    const cityName = cityInput.value.trim();
    if(cityName){
        errorContainer.classList.add("hidden")
        fetchClima(cityName);
    }else{
        renderError();
    }
});