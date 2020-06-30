import React from 'react'

// returns the title of a course
const SubHeader = (props) => 
    <h2>{props.course}</h2>

// returns the name of a course part and the number of the part's exercises
const Part = (props) => 
    <p>{props.name} {props.number}</p>

// creates the listing of course's parts
const Content = (props) => 
      <>
      {props.parts.map(part => <Part key={part.id} name={part.name} number={part.exercises}/>)}
      </>
  
// counts the total number of exercises on a course
const Total = (props) => {
    const sumFunction = (total, value) => total + value
    const values = props.parts.map(parts => parts.exercises)
    return(
      <p><strong>Total number of exercises:</strong> {values.reduce(sumFunction)}</p>
    )
  }
  
const Course = (props) => {
    return(
      <>
      <SubHeader course={props.course.name}/>
      <Content parts={props.course.parts}/>
      <Total parts={props.course.parts}/>
      </>
    )
}

export default Course