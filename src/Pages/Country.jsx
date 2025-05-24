import React, { useEffect, useState } from 'react'
import Footer from '../Footer';
import search from '../assets/icons8-search.svg'
import loader from '../assets/rocket.gif'

const Country = () => {
    const [countryInfo, setCountryInfo] = useState([]);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [DefaultResult, setDefaultResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [visibleCount, setVisibleCount] = useState(16);
    const [showFilter, setShowFilter] = useState(false);
    const [showFilteredResults, setShowFilteredResults] = useState(false);
    const [filteredResults, setFilteredResults] = useState([]);
    const [activeFilter, setActiveFilter] = useState('');

    async function getCountries(){
        setLoading(true);
        const countriesInfo = await fetch('https://restcountries.com/v3.1/all');
        const response = await countriesInfo.json();
        console.log("Results: ",response);
        if(response){
            setLoading(false);
            setCountryInfo(response);
        }
    }

    useEffect(() => {
        getCountries();
    }, []);

    function findCounty(name){
        if(document.getElementById('search').value.length > 2){
            const countryName = name.toLowerCase();
            const list = countryInfo.filter(
                (country) => {
                    const capital = Array.isArray(country.capital) ? country.capital[0]?.toLowerCase() : " ";
                    return(
                        country.name.common.toLowerCase().includes(countryName) ||
                        capital.includes(countryName)
                    );
                }
            );
            console.log(countryInfo.map((country) => country.capital));
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

    function sortCountry(e){
        const list = [...countryInfo];
        const buttonType = e.target.id;

        if(buttonType === 'byA-Z'){
            setActiveFilter('byA-Z');
            list.sort((a,b) => a.name.common.toLowerCase().localeCompare(b.name.common.toLowerCase()));
        }
        else if(buttonType === 'byZ-A'){
            setActiveFilter('byZ-A');
            list.sort((a,b) => b.name.common.toLowerCase().localeCompare(a.name.common.toLowerCase()));
        }
        else if(buttonType === 'HighPop'){
            setActiveFilter('HighPop');
            list.sort((a,b) => b.population - a.population);
        }
        else if(buttonType === 'LowPop'){
            setActiveFilter('LowPop');
            list.sort((a,b) => a.population - b.population);
        }
        setFilteredResults(list);
        setShowFilteredResults(true);
    }

    const filterByCurrency = () => {
        const list = [...countryInfo];
        const curr = document.getElementById('curr').value;
        if(curr === 'Select a Currency'){
            setFilteredResults([]);
            setShowFilteredResults(false);
            return;
        }
        setActiveFilter('currency');
        const filteredList = list.filter((country) => country.currencies ? Object.values(country.currencies).map((currency) => `${currency.name.toLowerCase()} (${currency.symbol})`).join(', ').includes(curr.toLowerCase()) : null);
        console.log(curr, 'using countries', filteredList);
        setFilteredResults(filteredList);
        setShowFilteredResults(true);
        return
    }

    const filterByLanguage = () => {
        const list = [...countryInfo];
        const lang = document.getElementById('lang').value;
        if(lang === 'Select a Language'){
            setFilteredResults([]);
            setShowFilteredResults(false);
            return;
        }
        setActiveFilter('language');
        const filteredList = list.filter((country) => country.languages ? Object.values(country.languages).map((lang) => lang).includes(lang) : null);
        console.log(lang, 'speaking countries are: ', filteredList);
        setFilteredResults(filteredList);
        setShowFilteredResults(true);
        return
    }
    
  return (
    <>
    <div className='flex flex-col items-center justify-center pt-30'>   
        <h1 className='text-[32px] font-semibold text-center'>World Countries Information</h1>
        <div id='searchFilter' className='flex flex-wrap gap-10 items-center justify-start w-full p-4'>
            <div className='flex gap-2 items-center px-2 py-4'>
                <img src={search} className='h-[24px]'/>
                <input
                    className='p-1.5 rounded-md border-[#979797] bg-[#979797e2] max-w-[400px]'
                    type='text'
                    id='search'
                    placeholder='Search any country'
                    onChange={(e) => {setShowFilter(false); setShowFilteredResults(false); findCounty(e.target.value)}}
                />
            </div>
            <div className='flex gap-6 items-center px-2 py-4'>
                {!showFilter && 
                    <button 
                        className={`px-2 py-1 rounded-md cursor-pointer border-2 border-white transition-all duration-75 hover:bg-[#6e6e6eb0] active:bg-[#6e6e6eb0] ${showFilter ? 'bg-[#6e6e6eb0]' : ''}`}
                        onClick={() => {setShowFilter(true)}}
                    >
                        Filter
                    </button>
                }
                {showFilter && 
                    <div className='flex flex-wrap gap-3 px-2 bg-[#ffffff39] rounded-lg py-2'>
                        <button 
                            id='byA-Z'
                            className={`p-1 rounded-md cursor-pointer text-[#ffffff94] hover:text-[#ffff] active:text-[#ffff] ${activeFilter === 'byA-Z'? 'text-white' : ''}`}
                            onClick={sortCountry}
                        >
                            A-Z
                        </button>
                        <button 
                            id='byZ-A'
                            className={`p-1 rounded-md cursor-pointer text-[#ffffff94] hover:text-[#ffff] active:text-[#ffff] ${activeFilter === 'byZ-A' ? 'text-white' : ''}`}
                            onClick={sortCountry}
                        >
                            Z-A
                        </button>
                        <button 
                            id='HighPop'
                            className={`p-1 rounded-md cursor-pointer text-[#ffffff94] hover:text-[#ffff] active:text-[#ffff] ${activeFilter === 'HighPop' ? 'text-white' : ''}`}
                            onClick={sortCountry}
                        >
                            Highest population
                        </button>
                        <button 
                            id='LowPop'
                            className={`p-1 rounded-md cursor-pointer text-[#ffffff94] hover:text-[#ffff] active:text-[#ffff] ${activeFilter === 'LowPop' ? 'text-white' : ''}`}
                            onClick={sortCountry}
                        >
                            Lowest population
                        </button>
                        <select 
                            id='lang' 
                            onChange={filterByLanguage} 
                            className={`text-[#ffffff94] cursor-pointer hover:text-[#ffff] active:text-[#ffff] ${activeFilter === 'language' ? 'text-white' : ''}`}
                        >
                            <option className='text-black'>Select a Language</option>
                            <option className='text-black'>English</option>
                            <option className='text-black'>Hindi</option>
                            <option className='text-black'>Spanish</option>
                            <option className='text-black'>French</option>
                            <option className='text-black'>German</option>
                            <option className='text-black'>Arabic</option>
                        </select>
                        <select 
                            id='curr' 
                            onChange={filterByCurrency}
                            className={`text-[#ffffff94] cursor-pointer hover:text-[#ffff] active:text-[#ffff] ${activeFilter === 'currency' ? 'text-white' : ''}`}
                        >
                            <option className='text-black'>Select a Currency</option>
                            <option className='text-black'>dollar ($)</option>
                            <option className='text-black'>pound (£)</option>
                            <option className='text-black'>euro (€)</option>
                            <option className='text-black'>dinar</option>
                            <option className='text-black'>dirham</option>
                            <option className='text-black'>rupee (₹)</option>
                        </select>

                        {showFilter && 
                            <button 
                                className={`rounded-md py-0.5 px-1 cursor-pointer transition-all duration-75 text-black bg-[#ffff]`}
                                onClick={() => {setShowFilter(false); setShowFilteredResults(false); setFilteredResults([]); setActiveFilter('')}}
                            >
                                Clear Filter
                            </button>
                        }
                    </div>
                }
            </div>
        </div>
        <div className='flex flex-wrap items-center justify-center gap-5 p-4 min-h-[45vh]'>
            {showSearchResults ? 
                searchResults.map((country, index) => {
                    return(
                        <div key={index} className='w-auto h-auto p-1 flex flex-col items-center justify-around rounded-md border-2 border-[#b3b3b3] bg-[#ffffffbc] transition-all duration-300 hover:scale-105 hover:bg-[#ffffffa1] shadow-inner cursor-pointer active:scale-105 active:bg-[#ffffffa1]'>
                            <img src={country.flags.png} alt='India' className='h-[150px] w-[300px] rounded shadow-lg'/>
                            <div className='flex flex-col w-[300px] justify-center items-center mb-[30px]'>
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
                                        Population: {country.population.toLocaleString('en-IN')}
                                    </span>
                                </div>
                            </div>
                            <a 
                                className='rounded-md bg-[#4a8eb8] px-2 py-1 transition-transform duration-200 hover:scale-105 cursor-pointer active:scale-105' 
                                href={country.maps.googleMaps} 
                                target='_blank' 
                                rel='noreferrer'
                            >
                                View Map
                            </a>
                        </div>
                    );
                }) :   showFilteredResults?
                filteredResults.slice(0, visibleCount).map((country, index) => {
                    return(
                        <div key={index} className='w-auto h-auto p-1 flex flex-col items-center justify-around rounded-md border-2 border-[#b3b3b3] bg-[#ffffffdc] transition-all duration-300 hover:scale-105 hover:bg-[#ffffffa1] shadow-inner cursor-pointer active:scale-105 active:bg-[#ffffffa1]'>
                            <img src={country.flags.png} alt='India' className='h-[150px] w-[300px] rounded shadow-lg'/>
                            <div className='flex flex-col w-[300px] justify-center items-center mb-[30px]'>
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
                                        Population: {country.population.toLocaleString('en-IN')}
                                    </span>
                                </div>
                            </div>
                            <a 
                                className='rounded-md bg-[#4a8eb8] px-2 py-1 transition-transform duration-200 hover:scale-105 cursor-pointer active:scale-105' 
                                href={country.maps.googleMaps} 
                                target='_blank' 
                                rel='noreferrer'
                            >
                                View Map
                            </a>
                        </div>
                    );
                }) :  !DefaultResult ?
                countryInfo.slice(0, visibleCount).map((country, index) => {
                    return(
                        <div key={index} className='w-auto h-auto p-1 flex flex-col items-center justify-around rounded-md border-2 border-[#b3b3b3] bg-[#ffffffdc] transition-all duration-300 hover:scale-105 hover:bg-[#ffffffa1] shadow-inner cursor-pointer active:scale-105 active:bg-[#ffffffa1]'>
                            <img src={country.flags.png} alt='India' className='h-[150px] w-[300px] rounded shadow-lg'/>
                            <div className='flex flex-col w-[300px] justify-center items-center mb-[30px]'>
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
                                        Population: {country.population.toLocaleString('en-IN')}
                                    </span>
                                </div>
                            </div>
                            <a 
                                className='rounded-md bg-[#4a8eb8] px-2 py-1 transition-transform duration-200 hover:scale-105 cursor-pointer active:scale-105' 
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
            {loading &&
                <div>
                    <span className='text-[18px] flex gap-1 items-center'>
                        please wait... 
                        <img src={loader} alt='loader' className='h-[24px]'/>
                    </span>
                </div>
            }
            {(visibleCount < countryInfo.length && !showSearchResults && !showFilteredResults) ||
             (visibleCount < searchResults.length && showSearchResults && searchResults.length > 16) ||
             (visibleCount < filteredResults.length && showFilteredResults && filteredResults.length > 16)?
                <div className='flex gap-10'> 
                    <button 
                        className='p-1 rounded-md cursor-pointer transition-all duration-200 hover:scale-110 hover:bg-[#6e6e6eb0] active:bg-[#6e6e6eb0] active:scale-110'
                        onClick={() => setVisibleCount((prev) => prev + 16)}
                    >
                        <span>view more</span>
                    </button>
                    <button 
                        className='border-transparent border-b-2 cursor-pointer transition-all duration-200 hover:scale-110 hover:border-white active:border-white active:scale-110'
                        onClick={() => setVisibleCount((prev) => prev + countryInfo.length-prev)}
                    >
                        <span>view all</span>
                    </button>
                </div> : null
            }
        </div>
    </div>   
    <Footer/>       
    </>
  )
}

export default Country