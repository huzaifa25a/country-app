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
                setVisibleCount(NaN);
            }
            else{
                setSearchResults([]);
                setShowSearchResults(false);
                setDefaultResult(true);
                setVisibleCount(NaN);
            }
        }
        else{
            setShowSearchResults(false);
            setDefaultResult(false);
            setVisibleCount(16);
        }
    }

    function sortCountry(e){
        const list = [...countryInfo];
        const buttonType = e.target.id;
        const language = e.target.value;

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
        else if(language){
            console.log("Language Selected: ", language);
            if(language === 'Select a Language'){
                setFilteredResults([]);
                setShowFilteredResults(false);
                return;
            }
            const filteredList = list.filter((country) => country.languages ? Object.values(country.languages).map((lang) => lang).includes(language) : null);
            console.log(language, "Speaking countries: ", filteredList);
            setFilteredResults(filteredList);
            setShowFilteredResults(true);
            return
        }
        setFilteredResults(list);
        setShowFilteredResults(true);
    }
    
  return (
    <>
    <div className='flex flex-col items-center justify-center pt-30'>   
        <h1 className='text-[32px] font-semibold'>World Countries Information</h1>
        <div className='flex gap-5 items-center justify-start w-full p-4'>
            <div className='flex gap-5 items-center p-4'>
                <img src={search} className='h-[24px]'/>
                <input
                    className='p-1.5 rounded-md border-[#979797] bg-[#979797e2] w-[400px]'
                    type='text'
                    id='search'
                    placeholder='Search any country'
                    onChange={(e) => findCounty(e.target.value)}
                />
            </div>
            <div className='flex gap-6'>
                <button 
                    className={`px-2 py-1 rounded-md cursor-pointer border-2 border-white transition-all duration-75 hover:bg-[#6e6e6eb0] ${showFilter ? 'bg-[#6e6e6eb0]' : ''}`}
                    onClick={() => {setShowFilter(!showFilter); setShowFilteredResults(false); setFilteredResults([]); setActiveFilter('')}}
                >
                    Filter
                </button>
                {showFilter && 
                    <div className='flex gap-3 p-2 bg-[#ffffff39] rounded-lg'>
                        <button 
                            id='byA-Z'
                            className={`p-1 rounded-md cursor-pointer text-[#ffffff94] hover:text-[#ffff] ${activeFilter === 'byA-Z'? 'text-white' : ''}`}
                            onClick={sortCountry}
                        >
                            A-Z
                        </button>
                        <button 
                            id='byZ-A'
                            className={`p-1 rounded-md cursor-pointer text-[#ffffff94] hover:text-[#ffff] ${activeFilter === 'byZ-A' ? 'text-white' : ''}`}
                            onClick={sortCountry}
                        >
                            Z-A
                        </button>
                        <button 
                            id='HighPop'
                            className={`p-1 rounded-md cursor-pointer text-[#ffffff94] hover:text-[#ffff] ${activeFilter === 'HighPop' ? 'text-white' : ''}`}
                            onClick={sortCountry}
                        >
                            Highest population
                        </button>
                        <button 
                            id='LowPop'
                            className={`p-1 rounded-md cursor-pointer text-[#ffffff94] hover:text-[#ffff] ${activeFilter === 'LowPop' ? 'text-white' : ''}`}
                            onClick={sortCountry}
                        >
                            Lowest population
                        </button>
                        <select id='language' onChange={sortCountry}>
                            <option className='text-black'>Select a Language</option>
                            <option className='text-black'>English</option>
                            <option className='text-black'>Hindi</option>
                            <option className='text-black'>Spanish</option>
                            <option className='text-black'>French</option>
                            <option className='text-black'>German</option>
                        </select>
                    </div>
                }
            </div>
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
                                        Population: {country.population.toLocaleString('en-IN')}
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
                }) :   showFilteredResults?
                filteredResults.slice(0, visibleCount).map((country, index) => {
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
                                        Population: {country.population.toLocaleString('en-IN')}
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
                countryInfo.slice(0, visibleCount).map((country, index) => {
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
                                        Population: {country.population.toLocaleString('en-IN')}
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
            {loading &&
                <div>
                    <span className='text-[18px] flex gap-1 items-center'>
                        please wait... 
                        <img src={loader} alt='loader' className='h-[24px]'/>
                    </span>
                </div>
            }
            {visibleCount < countryInfo.length &&
                <div className='flex gap-10'> 
                    <button 
                        className='p-1 rounded-md cursor-pointer transition-all duration-200 hover:scale-110 hover:bg-[#6e6e6eb0]'
                        onClick={() => setVisibleCount((prev) => prev + 16)}
                    >
                        <span>view more</span>
                    </button>
                    <button 
                        className='border-transparent border-b-2 cursor-pointer transition-all duration-200 hover:scale-110 hover:border-white'
                        onClick={() => setVisibleCount((prev) => prev + countryInfo.length-prev)}
                    >
                        <span>view all</span>
                    </button>
                </div>
            }
        </div>
    </div>   
    <Footer/>       
    </>
  )
}

export default Country