import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({title}) => <h1>{title}</h1>

const SubHeader = ({title}) => <h2>{title}</h2>

const Feedback = (props) =>
  <tr>
    <td>{props.name}:</td>
    <td>{props.number}</td>
  </tr>

const StatisticLine = ({text, value, ending}) =>{
if(ending === ""){
  return(
  <tr><td>{text}</td><td colSpan="2">{value}</td></tr>
  )
}
  return(
    <tr><td>{text}</td><td>{value}</td><td>{ending}</td></tr>
  )
}

const Statistics = ({plus, zero, minus}) => {
  const sum = plus+zero+minus
  const avg = (plus + minus * -1)/(plus+zero+minus)
  const positiveRate = (plus/(plus+zero+minus)) * 100

  if(sum === 0){
    return(
      <tr><td colSpan="2">Emme ole vielä saaneet palautetta.</td></tr>
    )
  }

  return(
  <>
    <StatisticLine text="Yhteensä:" value={sum} ending="" />
    <StatisticLine text="Keskiarvo:" value={avg} ending="" />
    <StatisticLine text="Palaute on " value={positiveRate} ending=" % positiivista." />
  </>
  )
}

const Button = (props) =>
  <button onClick={props.handleClick}>
    {props.name}
  </button>

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header title="Anna palautetta"/>

      <Button handleClick={() => setGood(good + 1)} name="Hyvä" />
      <Button handleClick={() => setNeutral(neutral + 1)} name="Neutraali"/>
      <Button handleClick={() => setBad(bad + 1)} name="Huono"/>

      <SubHeader title="Palaute ja tilastot"/>

      <table>
        <tbody>
          <Feedback number={good} name="Hyvä" />
          <Feedback number={neutral} name="Neutraali" />
          <Feedback number={bad} name="Huono" />
          <Statistics plus={good} zero={neutral} minus={bad}/>
        </tbody>
      </table>
      

    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)