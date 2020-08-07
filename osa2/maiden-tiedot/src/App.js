import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Results from './components/Results'

function App() {
  const [ countrySearch, setSearch ] = useState('')
  const [ countryList, setCountries ] = useState([])
  const [ searchResults, setResult ] = useState([])

  // fetch the countries' data from the API (effect)
  const fetchCountries = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all?fields=name;capital;population;languages;flag;alpha2Code')
      .then(response => {
        setCountries(response.data)
      })
  }
  useEffect(fetchCountries, [])

  // find all the countries that include the searched word and add them to results
  const searchCountries = (query) => {
    const results = countryList.filter(country => country.name.toLowerCase().includes(query.toLowerCase()))
    setResult(results)
  }

  // handle the input field and send the query forward
  const handleSearch = (event) => {
    setSearch(event.target.value)
    searchCountries(event.target.value)
  }

  // handles the pressing of the "show" button
  const handleShowButton = (event) => {
    setSearch(event.target.id)
    searchCountries(event.target.id)
  }

  return (
    <div>
      <p>Find countries: <input 
                            value={countrySearch}
                            onChange={handleSearch}/></p>
      <Results handler={handleShowButton} query ={countrySearch} countries={searchResults}/>
    </div>
  );
}

export default App;
