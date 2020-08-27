import React, { useState, useEffect } from 'react'
import Contacts from './components/Contacts'
import Form from './components/Forms'
import Notification from './components/Notifications'
import contactService from './services/persons'
import './index.css'

const SubHeader = ({title}) =>
    <h2>{title}</h2>

const App = () => {
    const [persons, setPersons] = useState([])

    const [ newName, setNewName ] = useState('')

    const [ newNumber, setNewNumber ] = useState('')

    const [ nameSearch, setSearch ] = useState('')

    const [ message, setMessage ] = useState([null,false])

    // Effect that fetches the contacts from the database
    const fetchHook = () => {
        contactService
          .getAll()
          .then(contacts => {
            setPersons(contacts)
          })
      }

    useEffect(fetchHook, [])

    // These three update the input render in the fields
    const nameInput = (event) => {
        setNewName(event.target.value)
    }

    const numberInput = (event) => {
        setNewNumber(event.target.value)
    }

    const searchInput = (event) => {
        setSearch(event.target.value)
    }

    // Handles the submitting of a new contact
    const formHandler = (event) => {
        event.preventDefault()
        const newGuy={name:newName, number:newNumber}
        // Checks if the person is already in contacts
        const comparison = persons.find(guy=>guy.name === newName)
        if (comparison === undefined){
            // Add if a new contact
            contactService    
            .add(newGuy)    
            .then(addedGuy => {      
                setPersons(persons.concat(addedGuy))
                // Empty input fields
                setNewName('')
                setNewNumber('')
                // Show successful addition message
                setMessage([`${addedGuy.name} was added`,false])        
                setTimeout(() => {          
                    setMessage([null,false])        
                }, 5000)
            })
            
        }
        else {
            // Update if an existing contact (and the permission is given)
            if(window.confirm(`${comparison.name} is already in the phonebook. Do you want to replace the number?`)){
                contactService
                .update(comparison.id, newGuy)
                .then(updatedGuy => {      
                    setPersons(persons.map(guy => guy.id !== comparison.id ? guy : updatedGuy))
                    // Empty input fields
                    setNewName('')
                    setNewNumber('')
                    // Show successful update message
                    setMessage([`Updated the number for ${updatedGuy.name}`,false])        
                    setTimeout(() => {          
                    setMessage([null,false])        
                }, 5000)
                })
                // Show an error message if the contact to be updated has already been removed from the server
                .catch(error => {
                    setMessage([`${comparison.name} has already been removed from contacts.`,true])        
                    setTimeout(() => {          
                    setMessage([null,false])        
                }, 5000)
                }

                )
            } 
        }
    }

    // Updates the contacts to be rendered after a removal of a contact
    const updateRemoved = (id) => {
        const removed = persons.findIndex((person) => person.id === id)
        const removedName = persons[removed].name
        const newPersons = persons.slice(0,removed).concat(persons.slice(removed+1))
        setPersons(newPersons)
        // Show successful removal message
        setMessage([`Removed ${removedName} from contacts.`,false])        
                setTimeout(() => {          
                    setMessage([null,false])        
                }, 5000)

    }

    // Handles the removal of a contact from the database
    const remove = (event) => {
        const id = event.target.value
        const toBeDeleted = persons.find(person =>person.id === id)
        if(window.confirm(`Do you really want to delete ${toBeDeleted.name}?`)){
            contactService
            .remove(id)
            .then(
                updateRemoved(id)
            )
        }
        
    }

    // Decides which contacts to show depending on the search input
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

        <Notification msgData = {message}/>

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