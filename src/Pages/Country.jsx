import React, { useEffect, useState } from 'react'

const Country = () => {
    const [countryInfo, setCountryInfo] = useState([]);

    async function getCountries(){
        const countriesInfo = await fetch('https://restcountries.com/v3.1/all');
        const response = await countriesInfo.json();
        setCountryInfo(response);
        console.log(response);
    }

    useEffect(() => {
        getCountries();
    }, []);
    
  return (
    <div className='flex flex-col items-center justify-center pt-30'>   
        <h1 className='text-[32px] font-semibold'>World Countries Information</h1>
        <div className='flex flex-wrap items-center justify-center gap-5 p-4'>
            {countryInfo.map((country, index) => {
                return(
                    <div key={index} className='w-[330px] h-[400px] flex flex-col items-center justify-around rounded-md border-2 border-[#b3b3b3] bg-[#f2f2f2b3] transition-transform duration-300 hover:scale-105'>
                        <img src={country.flags.png} alt='India' className='h-[150px] w-[300px] rounded'/>
                        <div className='flex flex-col w-[300px] justify-center items-center'>
                            <span className='text-black font-bold text-center mb-3'>{country.name.common}</span>
                            <div className='flex flex-col text-start w-[250px] gap-1'>
                                <span 
                                    className={`text-black font-medium ${!country.capital ? 'italic' : ''}`}
                                    title={country.capital}
                                >
                                    Capital: {country.capital ? country.capital.join(", ") : "Data not available"}
                                </span>
                                <span 
                                    className={`text-black font-medium max-w-[250px] truncate ${!country.languages ? 'italic' : ''}`}
                                    title={country.languages ? Object.values(country.languages).join(", ") : "Data not available"}
                                >
                                    Language: {country.languages ? Object.values(country.languages).join(", ") : "Data not available"}
                                </span>
                                <span 
                                    className='text-black font-medium max-w-[250px] truncate'
                                    title={country.currencies ? Object.values(country.currencies).map(currency => `${currency.name} (${currency.symbol})`). join(", "): "Data not available"}
                                >
                                    Currency: {country.currencies ? Object.values(country.currencies).map(currency => `${currency.name} (${currency.symbol})`). join(", "): "Data not available"}
                                </span>
                                <span 
                                    className='text-black font-medium'
                                >
                                    Population: {country.population}
                                </span>
                            </div>
                        </div>
                        <a 
                            className='rounded-md bg-[#4a8eb8] px-2 py-1 transition-transform duration-200 hover:scale-105' 
                            href={country.maps.googleMaps} 
                            target='_blank' 
                            rel='noreferrer'
                        >
                            View Map
                        </a>
                    </div>
                );
            })}
        </div>
    </div>
  )
}

export default Country