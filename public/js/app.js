const form = document.getElementById("weather-form");
const input = document.getElementById("weather-input");
const p1 = document.getElementById("p-1");
const p2 = document.getElementById("p-2");

form.addEventListener('submit', (e) => {
    // aby se nerefreshla stranka po submit
    e.preventDefault();
    p1.innerHTML = "Loading...";
    p2.innerHTML = "";
    // fetch lze pouzit pouze z browseru - pri predani pouze relativni adresy se pouzije aktualni (localhost pri vyvoji a opravdova pri deploy)
    fetch('/weather?address=' + input.value)
        .then((res) => res.json())
        .then((data) => {
            if (data.error) {
                p1.innerHTML = "Error: " + data.error;
            }
            else {
                console.log(data)
                p1.innerHTML = "Location: " + data.location;
                p2.innerHTML = "Forecast: " + data.forecast;
            }
        });
});