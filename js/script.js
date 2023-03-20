const url = 'https://restcountries.com/v3.1/all';
const infoCountries = document.getElementById('detail-countries');
const mainCountries = document.getElementById('main-container');

document.addEventListener('DOMContentLoaded', e => {
    fetchData();
});

const fetchData =  async () => {
    try {
        const response = await fetch(url);
        const countries = await response.json();
        banderas(countries);
        regionCliente(countries);
        formularioCliente(countries);
        
    } catch (err) {
        console.error(err);
    }
};

let banderas = countries => {
    let elementos = '';
    countries.forEach((element) => {
        elementos += `
        <a href="detail.html?name=${element.name.common}">
        <article id="detail-countries" class="countries-info ">
                <img class="img-country" src="${element.flags.svg}" alt="flags images">
            <div class="container-info background-elements">
                <h2>
                    ${element.name.common}
                </h2>
                <ul id="list-info">
                    <li><p><b>Population: </b> ${element.population}</p></li>
                    <li><p><b>Region: </b> ${element.region}</p></li>
                    <li><p><b>Capital: </b> ${element.capital}</p></li>
                </ul>
            </div>
        </article>
        </a>
        `;
        mainCountries.innerHTML = elementos;
    });
};

fetchData();


