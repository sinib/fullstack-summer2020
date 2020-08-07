import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Contacts from './components/Contacts'
import Form from './components/Forms'

const SubHeader = ({title}) =>
    <h2>{title}</h2>

const App = () => {
    const [persons, setPersons] = useState([])

    const [ newName, setNewName ] = useState('')

    const [ newNumber, setNewNumber ] = useState('')

    const [ nameSearch, setSearch ] = useState('')

    const fetchHook = () => {
        axios
          .get('http://localhost:3001/persons')
          .then(response => {
            setPersons(response.data)
          })
      }

    useEffect(fetchHook, [])

    const nameInput = (event) => {
        setNewName(event.target.value)
    }

    const numberInput = (event) => {
        setNewNumber(event.target.value)
    }

    const searchInput = (event) => {
        setSearch(event.target.value)
    }

    const formHandler = (event) => {
        event.preventDefault()
        const newGuy={name:newName, number:newNumber}
        const comparison = persons.find(guy=>guy.name === newName)
        if (comparison === undefined){
            setPersons(persons.concat(newGuy))
        }
        else {
            window.alert(`${newName} is already in the phonebook.`)
        } 
    }

    const shownContacts = nameSearch === '' 
        ? persons 
        : persons.filter(person => person.name.toLowerCase().includes(nameSearch.toLowerCase()))

    return (
      <div>
        <h1>Phonebook</h1>

        <SubHeader title="Search contacts"/>

        <Form   inputs={[
                        {id:1, name:'Name', value:nameSearch, onChange:searchInput}
                        ]} 
                buttons={[]}
                onSubmit=''/>

        <SubHeader title="Add new contact"/>

        <Form   inputs={[
                        {id:2, name:'Name', value:newName, onChange:nameInput}, 
                        {id:3, name:'Number', value:newNumber, onChange:numberInput}
                        ]} 
                buttons={[
                        {id:1, type:'submit', text:'Add'}
                        ]}
                onSubmit={formHandler}/>

        <SubHeader title="Contacts"/>
        <Contacts list={shownContacts}/>
      </div>
    )
  }
  
  export default App 