const selectRegion = document.getElementById('search-select');

const regionCliente = countries => {
    selectRegion.addEventListener('change', e => {
        const userSelect = e.target.value;
        if (userSelect === 'all') {
            banderas(countries);
        } else {
            let filterSelect = countries.filter((element) => element.region === userSelect);
            banderas(filterSelect);
        }
    });
};


