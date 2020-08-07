import React, { useState, useEffect } from 'react'
import axios from 'axios'

// fetches the weather of the country's capital from an API and renders info about it
const Weather = ({country}) => {
    const api_key = process.env.REACT_APP_API_KEY
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+  country.capital + ',' + country.alpha2Code + '&appid=' + api_key

    const [ countryWeather, setWeather ] = useState({}) 

    const fetchWeather = () => {
    axios
        .get(apiUrl)
        .then(response => {
        setWeather(response.data)
        })
    }
    useEffect(fetchWeather, [])

    if(countryWeather.weather === void(0)){
        return (<></>)
    } 
    return(
        <>
        <p>{countryWeather.weather[0].description[0].toUpperCase() + countryWeather.weather[0].description.slice(1)}</p>
        <p>Temperature: {(countryWeather.main.temp - 274.15).toFixed(0)} °C</p>
        <p>Temperature feels like: {(countryWeather.main.feels_like - 274.15).toFixed(0)} °C</p>
        </>
    )

}

const Language = ({language}) =>
    <li>{language.name}</li>

// renders the country's info
const Country = ({country}) => {
    return(
        <>
        <h2>{country.name}</h2>
        <img alt={'Flag of the country'} width={200} src={country.flag}/>
        <p>Capital: {country.capital}<br/>
        Population: {country.population}
        </p>

        <h3>Languages</h3>
        <ul>
            {country.languages.map(language => <Language key={language.name} language={language}/>)}
        </ul>

        <h3>Weather in {country.capital}, {country.name}</h3>
        <Weather key={country.alpha2Code} country={country}/>
        </>
    )
    
}

// renders the results differently depending on how many there are
const Results = (props) => {
    const resultAmount = props.countries.length

    if (resultAmount === 250){
        return(<p></p>)
    }
    else if(resultAmount > 10){
        return(
        <p>Too many results ({resultAmount}). Specify your search.</p>
        )
    }
    else if(resultAmount > 1){
        return(
            props.countries.map(country => 
            <p key ={country.name}>{country.name} 
            <button style={{marginLeft:5}} id={country.name} onClick={props.handler}>Show</button>
            </p>
            )
        )
    }
    else if(resultAmount === 1){
        const country = props.countries[0]
        return(
            <Country key={country.name} country={country}/>
        )
    }
    else if(resultAmount < 1 && (props.query === void(0) || props.query === '')){
        return(
            <p></p>)
    }
    return(
        <p>No countries found.</p>
        )
    
}

export default Results