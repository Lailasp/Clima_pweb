// Variáveis e seleção de elementos
const apiKey = "7acd29c0a6dc4217ae404207251308"; // sua API Key

// Elementos de entrada e botão
const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search-btn");

// Elementos de exibição de dados
const cityElement = document.querySelector("#city");
const local_timeElement = document.querySelector("#local_time");
const temperatureElement = document.querySelector("#temperature"); 
const weatherIconElement = document.querySelector("#weather-icon");
const conditionElement = document.querySelector("#condition");
const feelsLikeElement = document.querySelector("#feels-like");
const humidityElement = document.querySelector("#humidity");
const wind_speedElement = document.querySelector("#wind_speed");
const pressureElement = document.querySelector("#pressure");
const visibilityElement = document.querySelector("#visibility");
const uv_indexElement = document.querySelector("#uv_index");

// Contêineres de resultado e erro
const weatherResult = document.querySelector("#weather-result");
const errorMessage = document.querySelector("#error-message");

// Função para buscar dados da API
const getWeatherData = async (city) => {
    const apiWeatherURL = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no&lang=pt`;
    
    try {
        const res = await fetch(apiWeatherURL);

        if (!res.ok) {
            throw new Error("Cidade não encontrada");
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        throw error;
    }
};

// Função para exibir dados no card
const showWeatherData = async (city) => {
    try {
        const data = await getWeatherData(city);

        // Preenchendo os campos
        cityElement.innerText = `${data.location.name}, ${data.location.country}`;
        local_timeElement.innerText = `Horário local: ${data.location.localtime}`;
        temperatureElement.innerHTML = `<span id="temperature_value">${data.current.temp_c}°C</span>`;
        weatherIconElement.src = data.current.condition.icon;
        weatherIconElement.alt = data.current.condition.text;
        conditionElement.innerText = data.current.condition.text;
        feelsLikeElement.innerText = `${data.current.feelslike_c}°C`;
        humidityElement.innerText = `${data.current.humidity}%`;
        wind_speedElement.innerText = `${data.current.wind_kph} km/h`;
        pressureElement.innerText = `${data.current.pressure_mb} hPa`;
        visibilityElement.innerText = `${data.current.vis_km} km`;
        uv_indexElement.innerText = data.current.uv;

        // Mostra o card e esconde mensagem de erro
        weatherResult.classList.remove("hidden");
        errorMessage.classList.add("hidden");
    } catch (error) {
        // Exibe mensagem de erro
        weatherResult.classList.add("hidden");
        errorMessage.classList.remove("hidden");
        errorMessage.querySelector("p").innerText = "Cidade não encontrada. Tente novamente.";
    }
};

// Evento de clique no botão
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();

    if (city) {
        showWeatherData(city);
    } else {
        errorMessage.classList.remove("hidden");
        weatherResult.classList.add("hidden");
        errorMessage.querySelector("p").innerText = "Digite o nome de uma cidade.";
    }
});

// Busca inicial para "Arapiraca"
showWeatherData("Arapiraca");
