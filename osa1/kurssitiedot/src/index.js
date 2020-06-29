import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return(
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return(
    <p>{props.name} {props.number}</p>
  )
}

const Content = (props) => {
  return(
    <>
    <Part name={props.parts[0]} number={props.exercises[0]}/>
    <Part name={props.parts[1]} number={props.exercises[1]}/>
    <Part name={props.parts[2]} number={props.exercises[2]}/>
    </>
  )
}

const Total = (props) => {
  return(
    <p>Number of exercises {props.numbers[0] + props.numbers[1] + props.numbers[2]}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  var parts = [part1, part2, part3]
  var exercises= [exercises1, exercises2, exercises3]

  return (
    <div>
      <Header course={course}/>
      <Content parts={parts} exercises={exercises}/>
      <Total numbers={exercises}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
