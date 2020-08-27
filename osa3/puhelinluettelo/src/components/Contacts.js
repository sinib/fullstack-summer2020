import React from 'react'

const Person = (props) =>{
  return(
  <p>
    {props.name}&nbsp;
    {props.number}&nbsp;
    <button value={props.id} onClick={props.remover}>Delete</button>
  </p>
  )
}
    
const Contacts = (props) =>
    props.list.map(person => <Person key={person.id} id ={person.id} name={person.name} number={person.number} remover = {props.remover}/>)

export default Contacts