import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Weather = ({weatherData}) => {
    //try{
        const description = weatherData.weather[0].description
        const weather = description[0].toUpperCase() +  description.slice(1); 
        return(
            <>
            <p>{weather}</p>
            <p>Temperature: {(weatherData.main.temp - 274.15).toFixed(0)} °C</p>
            <p>Temperature feels like: {(weatherData.main.feels_like - 274.15).toFixed(0)} °C</p>
            </>
        )
    //}
    /* catch{
        return(
            <p>Error</p>
        )
    } */
    
}

const Language = ({language}) =>
    <li>{language.name}</li>

const Country = ({country}) => {
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

    <Weather key={country.alpha2Code} weatherData={countryWeather}/>
    </>
    )
    
}

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