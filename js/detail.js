const backButton = document.getElementById('back-button');
const mainContainer = document.getElementById('detail-country-container');
const urlCountry = new URLSearchParams(window.location.search);
const params = urlCountry.get('name');

document.addEventListener("DOMContentLoaded", e => {
    console.log("DOM fully loaded and parsed");
    fetchData()
});

const fetchData = async () => {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const countries = await response.json();
        const filterParams = countries.filter((element) => element.name.common === params);
        console.log(filterParams);
        banderas(filterParams);
    } catch (error) {
        console.log(error);
    }
}

const banderas = countries => {
    let elementos = '';
    for(let[index, item] of countries.entries()){
        let nombreNativo;
        for(let langCode in item.name.nativeName) {
            nombreNativo = `${item.name.nativeName[langCode].official}`;
        }

        let moneda; 
        for(let langCode in item.currencies) {
            moneda = `${item.currencies[langCode].name}`;
        }

        let lenguaje = [];
        for(let langCode in item.languages) {
           lenguaje.push(`${item.languages[langCode]}`);
        }        

        if (item.borders === undefined) {
            elementos += `
            <img class="detail-img" src="${item.flags.svg}" alt="imagen de la bandera del pais">
            <article id="country-info">
                <h1 id="title"> ${item.name.common}</h1>
                <div class="detail-info">
                    <div class="detail-info-left">
                     <p><b>Native Name: </b> ${nombreNativo}</p>
                     <p><b>Population: </b> ${item.population}</p>
                     <p><b>Region: </b> ${item.region}</p>
                     <p><b>Sub Region: </b> ${item.subregion}</p>
                     <p><b>Capital: </b> ${item.capital}</p>
                    </div>
                    <div class="detail-info-rigth">
                     <p><b>Top Level Domain: </b> ${item.altSpellings[0]}</p>
                     <p><b>Currencies: </b> ${moneda}</p>
                     <p><b>Languages: </b> ${lenguaje.join(', ')}</p>
                    </div>
                </div>
                <div class="container-border">
                   <p> <b>Border Countries: </b> ${item.name.common} no tiene paises fronterizos</p>    
                </div>
            </article>
            `
        } else {
             elementos += `
            <img class="detail-img" src="${item.flags.svg}" alt="imagen de la bandera del pais">
            <article id="country-info">
                <h1 id="title"> ${item.name.common}</h1>
                <div class="detail-info">
                    <div class="detail-info-left">
                     <p><b>Native Name: </b> ${nombreNativo}</p>
                     <p><b>Population: </b> ${item.population}</p>
                     <p><b>Region: </b> ${item.region}</p>
                     <p><b>Sub Region: </b> ${item.subregion}</p>
                     <p><b>Capital: </b> ${item.capital}</p>
                    </div>
                    <div class="detail-info-rigth">
                     <p><b>Top Level Domain: </b> ${item.altSpellings[0]}</p>
                     <p><b>Currencies: </b> ${moneda}</p>
                     <p><b>Languages: </b> ${lenguaje.join(', ')}</p>
                    </div>
                </div>
                `
                const fronteras = item.borders.map((border) => {
                   return aplhaFilter(border)
                    .then(countryName => `<a href="detail.html?name=${countryName.split(' ').slice(0, 2).join(' ')}" class="a-country background-elements">${countryName.split(' ')[0]}</a>`)
                    .catch((error) => {
                        console.log(error);
                    })
                });
                Promise.all(fronteras)
                    .then((resultados) => {
                        let fronterasHtml = '';
                        for(i = 0; i < resultados.length; i++ ) {
                            fronterasHtml += resultados[i];
                        }
                        elementos += 
                        `
                         <div class="container-border" id="borders">
                         <p><b>Border Countries:</b></p>
                         <div class="border-paises">
                         ${fronterasHtml}
                         </div>
                         </div>
                         </article>
                             `;
                            mainContainer.innerHTML = elementos
                    })
                    .catch((error) => {
                        console.log(error);
                });
        }        
    }
    mainContainer.innerHTML = elementos;
}

backButton.addEventListener('click', e => {
    window.location.href = 'index.html';
});