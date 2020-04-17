console.log('Client Side JS');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const curLocation = document.getElementById('location');
const forecast = document.getElementById('forecast');
const loader = document.getElementById('preloader');
const weather = document.getElementById('weather-wrapper');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    loader.style.display = 'block';
    curLocation.innerHTML = '';
    forecast.innerHTML = '';
    weather.style.display = 'none';
    const location = search.value;

    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                curLocation.innerHTML = data.error;
                forecast.innerHTML = '';
                loader.style.display = 'none';
            } else {
                curLocation.innerHTML = data.location;
                forecast.innerHTML = data.forecast + 'º';
                loader.style.display = 'none';
                weather.style.display = 'flex';
                console.log(weather);
            }
        });
    });
});
