import React, { useEffect, useState } from 'react'
import Footer from '../Footer';
import search from '../assets/icons8-search.svg'

const Country = () => {
    const [countryInfo, setCountryInfo] = useState([]);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [DefaultResult, setDefaultResult] = useState(false);

    async function getCountries(){
        const countriesInfo = await fetch('https://restcountries.com/v3.1/all');
        const response = await countriesInfo.json();
        setCountryInfo(response);
        console.log(response);
    }

    useEffect(() => {
        getCountries();
    }, []);

    function findCounty(name){
        if(document.getElementById('search').value.length > 2){
            const countryName = name.toLowerCase();
            const list = countryInfo.filter((country) => country.name.common.toLowerCase().includes(countryName));
            if(list.length > 0){
                setSearchResults(list);
                setShowSearchResults(true);
                setDefaultResult(false);
            }
            else{
                setSearchResults([]);
                setShowSearchResults(false);
                setDefaultResult(true);
            }
        }
        else{
            setShowSearchResults(false);
            setDefaultResult(false);
        }
    }
    
  return (
    <>
    <div className='flex flex-col items-center justify-center pt-30'>   
        <h1 className='text-[32px] font-semibold'>World Countries Information</h1>
        <div className='flex gap-5 self-start items-center p-4 ml-[50px]'>
            <img src={search} className='h-[24px]'/>
            <input
                className='p-1.5 rounded-md border-[#979797] bg-[#979797e2] w-[400px]'
                type='text'
                id='search'
                placeholder='Search any country'
                onChange={(e) => findCounty(e.target.value)}
            />
        </div>
        <div className='flex flex-wrap items-center justify-center gap-5 p-4 min-h-[45vh]'>
            {showSearchResults ? 
                searchResults.map((country, index) => {
                    return(
                        <div key={index} className='w-[330px] h-[400px] flex flex-col items-center justify-around rounded-md border-2 border-[#b3b3b3] bg-[#ffffffbc] transition-all duration-300 hover:scale-105 hover:bg-[#ffffff69] shadow-inner cursor-pointer'>
                            <img src={country.flags.png} alt='India' className='h-[150px] w-[300px] rounded shadow-lg'/>
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
                                className='rounded-md bg-[#4a8eb8] px-2 py-1 transition-transform duration-200 hover:scale-105 cursor-pointer' 
                                href={country.maps.googleMaps} 
                                target='_blank' 
                                rel='noreferrer'
                            >
                                View Map
                            </a>
                        </div>
                    );
                }) :  !DefaultResult ?
                countryInfo.map((country, index) => {
                    return(
                        <div key={index} className='w-[330px] h-[400px] flex flex-col items-center justify-around rounded-md border-2 border-[#b3b3b3] bg-[#ffffffdc] transition-all duration-300 hover:scale-105 hover:bg-[#ffffffa1] shadow-inner cursor-pointer'>
                            <img src={country.flags.png} alt='India' className='h-[150px] w-[300px] rounded shadow-lg'/>
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
                                className='rounded-md bg-[#4a8eb8] px-2 py-1 transition-transform duration-200 hover:scale-105 cursor-pointer' 
                                href={country.maps.googleMaps} 
                                target='_blank' 
                                rel='noreferrer'
                            >
                                View Map
                            </a>
                        </div>
                    );
                }) : null
            }
            {DefaultResult && 
                <div>
                    <span className='text-[18px]'>There is no information to show!</span>
                </div>
            }
        </div>
    </div>   
    <Footer/>       
    </>
  )
}

export default Country