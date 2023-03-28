let city = document.querySelector("select").value

// Hacer una petición a la API
const fetchAPI = async () => {
    let response
    if (city === "madrid") {
        response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=40.42&longitude=-3.70&hourly=temperature_2m,windspeed_180m&daily=temperature_2m_max,temperature_2m_min&forecast_days=1&timezone=auto")
    } else if (city === "barcelona") {
        response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=41.39&longitude=2.16&hourly=temperature_2m,windspeed_180m&daily=temperature_2m_max,temperature_2m_min&forecast_days=1&timezone=auto")
    } else if (city === "sevilla") {
        response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=37.38&longitude=-5.97&hourly=temperature_2m,windspeed_180m&daily=temperature_2m_max,temperature_2m_min&forecast_days=1&timezone=auto")
    } else if (city === "valencia") {
        response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=39.47&longitude=-0.38&hourly=temperature_2m,windspeed_180m&daily=temperature_2m_max,temperature_2m_min&forecast_days=1&timezone=auto")
    }

    const entries = await response.json()
    console.log(entries.hourly.time.slice(0, 24))
    console.log(entries.hourly.temperature_2m.slice(0, 24))
        let output = `<tr>
        <th>Hora</th>
        <th>Temperatura</th>
        <th>Viento</th>
        </tr>`
        
        for (let i = 0; i < 24; i++) {
            output = `${output}
                <tr>
                    <td>${entries.hourly.time[i]}</td>
                    <td>${entries.hourly.temperature_2m[i]}ºC</td>
                    <td>${entries.hourly.windspeed_180m[i]} km/h</td>
                </tr>
            `
        }

        document.querySelector("table").innerHTML = output
}

// Detectar cuando cambia la ciudad
document.querySelector("select").onchange = () => {
    location.href = "#weather"
    city = document.querySelector("select").value
    fetchAPI()
}

// Solicitar
fetchAPI()