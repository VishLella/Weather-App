const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const searchBox = document.querySelector('.search-box');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

const image = document.querySelector('.weather-box img');
let isReversed = false;

//visibility is in meters
//sunset sunrise date calculation


search.addEventListener('click', () => {

    container.style.transition = '';

    const APIKey = '1a02cd0e63c60ca82ece16732c037e9b';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    setWeather(APIKey, city);


});

image.addEventListener('click', () => {
    // console.log("Clicked!")
    if (!isReversed) {

        container.style.transform = 'rotateY(180deg)';
        container.style.transition = '1s linear';
        weatherBox.style.transform = 'rotateY(180deg)';
        weatherBox.style.transition = '1s linear';
        searchBox.style.display = 'none';
        weatherDetails.style.transform = 'rotateY(180deg)';



        isReversed = true;

    } else {
        container.style.transform = '';
        weatherBox.style.transform = '';
        searchBox.style.display = '';
        weatherDetails.style.transform = '';
        isReversed = false;
    }
});

function setWeather(APIKey, city) {

    //http://api.openweathermap.org/data/2.5/weather?q=ITALY&units=metric&appid=1a02cd0e63c60ca82ece16732c037e9b
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {

        if (json.cod === '404') {
            container.style.height = '400px';
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            error404.style.display = 'block';
            error404.classList.add('fadeIn');
            return;
        }

        error404.style.display = 'none';
        error404.classList.remove('fadeIn');

        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        switch (json.weather[0].main) {
            case 'Clear':
                image.src = 'images/clear.png';
                break;

            case 'Rain':
                image.src = 'images/rain.png';
                break;

            case 'Snow':
                image.src = 'images/snow.png';
                break;

            case 'Clouds':
                image.src = 'images/cloud.png';
                break;

            case 'Haze':
                image.src = 'images/mist.png';
                break;

            default:
                image.src = '';
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

        weatherBox.style.display = '';
        weatherDetails.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height = '590px';

    });

}
