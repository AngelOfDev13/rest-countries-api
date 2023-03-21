const aplhaFilter = async (alpha3Code) => {
    try {
        const response = await fetch(`https://restcountries.com/v2/alpha/${alpha3Code}`);
        const countries = await response.json();
        const countryName = countries.name;
        return countryName;
    } catch (error) {
        console.log(error);
    }
}

