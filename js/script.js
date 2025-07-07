const countryForm = document.getElementById("country");
countryForm.addEventListener('submit', function(event) {
    const countryName = document.getElementById("countryName").value;
    event.preventDefault();
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error!! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const countryData = data[0];
            const countryInfo = `
                <h2>${countryData.name.common}</h2>
                <p>Capital: ${countryData.capital}</p>
                <p>Population: ${countryData.population}</p>
                <p>Area: ${countryData.area} km²</p>
                <p>Region: ${countryData.region}</p>
                <p>Subregion: ${countryData.subregion}</p>
                <p>Languages: ${Object.values(countryData.languages).join(', ')}</p>
                <p>Currencies: ${Object.values(countryData.currencies).map(currency => `${currency.name} (${currency.symbol})`).join(', ')}</p>
                <p>Timezones: ${countryData.timezones.join(', ')}</p>
                <p>Borders: ${countryData.borders ? countryData.borders.join(', ') : 'None'}</p>
                <p>Independence: ${countryData.independent ? 'Yes' : 'No'}</p>
                <p>UN Member: ${countryData.unMember ? 'Yes' : 'No'}</p>
                <p>Driving Side: ${countryData.car ? countryData.car.side : 'Unknown'}</p>
                <p>Flag: <img src="${countryData.flags.png}" alt="${countryData.name.common} flag" style="width: 50px; height: auto;"></p>
                <p>Region Code: ${countryData.cca2}</p>
                <p>Subregion Code: ${countryData.cca3}</p>
                <p>Continental Code: ${countryData.ccn3}</p>
                <p>Maps: <a href="${countryData.maps.googleMaps}" target="_blank">Google Maps</a></p>
                <p>Population Density: ${(countryData.population / countryData.area).toFixed(2)} people/km²</p>
                <p>Timezones: ${countryData.timezones.join(', ')}</p>
            `;
            document.getElementById("country-info").innerHTML = countryInfo;
            const flag = document.createElement("img");
            flag.src = countryData.flags.png;
            flag.alt = `${countryData.name.common} flag`;
            document.getElementById("country-info").appendChild(flag);
        })
        .catch(error => {
            console.error(`error fetching data: ${error}`);
        });
});