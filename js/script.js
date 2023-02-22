const url = 'https://restcountries.com/v3.1/all'

const fetchData =  async () => {
    try {
        const response = await fetch(url)
        const countries = await response.json();
        console.log(countries);
    } catch (err) {
        console.error(err);
    }
};

fetchData();


