let city = document.querySelector("select").value

// Hacer una petición a la API
const fetchAPI = async () => {
    let response
    if (city === "madrid") {
        response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=40.42&longitude=-3.70&hourly=temperature_2m,windspeed_180m&daily=temperature_2m_max,temperature_2m_min&forecast_days=3&timezone=auto")
    } else if (city === "barcelona") {
        response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=41.39&longitude=2.16&hourly=temperature_2m,windspeed_180m&daily=temperature_2m_max,temperature_2m_min&forecast_days=3&timezone=auto")
    } else if (city === "sevilla") {
        response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=37.38&longitude=-5.97&hourly=temperature_2m,windspeed_180m&daily=temperature_2m_max,temperature_2m_min&forecast_days=3&timezone=auto")
    } else if (city === "valencia") {
        response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=39.47&longitude=-0.38&hourly=temperature_2m,windspeed_180m&daily=temperature_2m_max,temperature_2m_min&forecast_days=3&timezone=auto")
    } else if (city === "badalona") {
        response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=41.45&longitude=2.25&hourly=temperature_2m,windspeed_180m&daily=temperature_2m_max,temperature_2m_min&forecast_days=3&timezone=auto")
    } 

    const entries = await response.json()
        let output = `<tr>
        <th>Hora</th>
        <th>Temperatura</th>
        <th>Viento</th>
        </tr>`

        // Total temperatura
        let wind_total = 0
        let temperature_total = 0
        for (let i = 0; i < 24; i++) {
            wind_total += entries.hourly.windspeed_180m[i]
            temperature_total += entries.hourly.temperature_2m[i]
            output = `${output}
                <tr>
                    <td>${entries.hourly.time[i]}</td>
                    <td>${entries.hourly.temperature_2m[i]}ºC</td>
                    <td>${entries.hourly.windspeed_180m[i]} km/h</td>
                </tr>
            `
        }
        document.querySelector("#temperatura-media-today").innerHTML = (temperature_total / 24).toString().substring(0, 4)
        document.querySelector("#velocidad-media-today").innerHTML = (wind_total / 24).toString().substring(0, 4)
        document.querySelector("table.today").innerHTML = output

        // Tomorrow Weather
        wind_total = 0
        temperature_total = 0
        for (let i = 24; i < 48; i++) {
            wind_total += entries.hourly.windspeed_180m[i]
            temperature_total += entries.hourly.temperature_2m[i]
            output = `${output}
                <tr>
                    <td>${entries.hourly.time[i]}</td>
                    <td>${entries.hourly.temperature_2m[i]}ºC</td>
                    <td>${entries.hourly.windspeed_180m[i]} km/h</td>
                </tr>
            `
        }
        // Output the results
        document.querySelector("#temperatura-media-tomorrow").innerHTML = (temperature_total / 24).toString().substring(0, 4)
        document.querySelector("#velocidad-media-tomorrow").innerHTML = (wind_total / 24).toString().substring(0, 4)
        document.querySelector("table.tomorrow").innerHTML = output
}

// Detectar cuando cambia la ciudad
document.querySelector("select").onchange = () => {
    location.href = "#weather"
    city = document.querySelector("select").value
    fetchAPI()
}

// Solicitar
fetchAPI()