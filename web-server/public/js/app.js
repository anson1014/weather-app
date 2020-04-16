console.log('Client Side JS');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const curLocation = document.getElementById('location');
const forecast = document.getElementById('forecast');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;

    fetch(`http://localhost:3000/weather?address=${location}`).then(
        (response) => {
            response.json().then((data) => {
                if (data.error) {
                    curLocation.innerHTML = data.error;
                    forecast.innerHTML = '';
                } else {
                    curLocation.innerHTML = data.location;
                    forecast.innerHTML = data.forecast;
                }
            });
        }
    );
});
