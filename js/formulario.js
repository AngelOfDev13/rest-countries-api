const input = document.getElementById('search-input');
const form = document.getElementById('search-form');
const p = document.getElementById('parrafo');

const formularioCliente = countries => {
    form.addEventListener('keyup', e => {
        e.preventDefault();
        const userWord = input.value.toLowerCase();
            p.innerHTML = '';
            let listFilter = countries.filter((element) => { 
                const apiWord = element.name.common.toLowerCase();
                if (apiWord.indexOf(userWord) !== -1) {
                    return element;
                };
            });
            if (listFilter.length === 0) {
                mainCountries.innerHTML = '';
                p.innerHTML = 'El pais ingresado no existe';
            } else {
                banderas(listFilter);
            };
    });
};