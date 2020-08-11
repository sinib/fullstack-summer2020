import React from 'react'

const Input = (props) =>
    <>
    {props.name}: <input value={props.value} onChange={props.onChange}/>
    </>

const Button = (props) =>
<button type={props.type}>{props.text}</button>

// Builds forms from given input, button, and onSubmit -props
const Form = (props) =>{
    let action
    if (props.onSubmit === ''){
        action = () => {return}
    }
    else{
        action = props.onSubmit
    }
    return(
    <form onSubmit={action}>
          <div>
            {props.inputs.map(input => <p key={input.id}><Input name={input.name} value={input.value} onChange={input.onChange}/></p>)}
          </div>
          <div>
            {props.buttons.map(button => <Button key={button.id} type={button.type} text={button.text}/>)}
          </div>
        </form>
    )
}
    

export default Form 