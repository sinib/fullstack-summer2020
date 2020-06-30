import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({title}) => <h2>{title}</h2>

const Button = (props) =>
  <button onClick={props.handleClick}>
    {props.name}
  </button>

const Favourite = ({anecdotes, votes}) => {
  let maximum = Math.max(...votes)
  let index = votes.indexOf(maximum)
  return <p>{(anecdotes[index])}</p>
}

const App = (props) => {
  const [selected, setSelected] = useState(0)

  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length))

  const random = choices => {
    let number = Math.floor(Math.random() * choices)
    while (selected === number){
      number = Math.floor(Math.random() * choices)
    }
    setSelected(number)
  }

  const voting = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <div>
      <Header title="Päivän anekdootti"/>

      <p>{props.anecdotes[selected]}<br/>
      Ääniä: {votes[selected]}</p>

      <Button name="Näytä uusi" handleClick = {() => random(anecdotes.length)}/>
      <Button name="Äänestä" handleClick = {() => voting()}/>

      <Header title="Suosituin anekdootti"/>

      <Favourite anecdotes={anecdotes} votes={votes}/>

      
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
