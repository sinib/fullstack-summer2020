import React, { useState, useEffect } from 'react'
import Contacts from './components/Contacts'
import Form from './components/Forms'
import contactService from './services/persons'

const SubHeader = ({title}) =>
    <h2>{title}</h2>

const App = () => {
    const [persons, setPersons] = useState([])

    const [ newName, setNewName ] = useState('')

    const [ newNumber, setNewNumber ] = useState('')

    const [ nameSearch, setSearch ] = useState('')

    const fetchHook = () => {
        contactService
          .getAll()
          .then(contacts => {
            setPersons(contacts)
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
            contactService    
            .add(newGuy)    
            .then(addedGuy => {      
                setPersons(persons.concat(addedGuy))    
            })
            
        }
        else {
            if(window.confirm(`${comparison.name} is already in the phonebook. Do you want to replace the number?`)){
                contactService
                .update(comparison.id, newGuy)
                .then(updatedGuy => {      
                    setPersons(persons.map(guy => guy.id !== comparison.id ? guy : updatedGuy))
                })
            } 
        }
    }

    const updateRemoved = (id) => {
        id = Number(id)
        const removed = persons.findIndex((person) => person.id === Number(id))
        const newPersons = persons.slice(0,removed).concat(persons.slice(removed+1))
        setPersons(newPersons)

    }

    const remove = (event) => {
        const id = event.target.value
        const toBeDeleted = persons.find(person =>person.id === Number(id))
        if(window.confirm(`Do you really want to delete ${toBeDeleted.name}?`)){
            contactService
            .remove(id)
            .then(
                updateRemoved(id)
            )
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
        <Contacts list={shownContacts} remover = {remove}/>
      </div>
    )
  }
  
  export default App 