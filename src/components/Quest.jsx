import React from "react";
import './Quest.css'

export default function Quest(props) {
 
    const answers = props.answers()
    const [selected, setSelected] = React.useState([])
    let radios = []


    for(let i = 0; i < 4; i++){
        radios[i] = document.getElementById(`id ${props.ind}${i}`)
    }
    
    

    return (
        <div className="questions--container">
            <h2 className="questions">
                {props.quesions()}
            </h2>
            <label htmlFor={`id ${props.ind}0`} className="answers" >{answers[0]}</label>
            <input id={`id ${props.ind}0`} type="radio" className="btn" value={answers[0]} name={`answers ${props.ind}`}/>
            <label htmlFor={`id ${props.ind}1`} className="answers">{answers[1]}</label>
            <input id={`id ${props.ind}1`} type="radio" className="btn" value={answers[1]} name={`answers ${props.ind}`}/>
            <label htmlFor={`id ${props.ind}2`} className="answers">{answers[2]}</label>
            <input id={`id ${props.ind}2`} type="radio" className="btn" value={answers[2]} name={`answers ${props.ind}`}/>
            <label htmlFor={`id ${props.ind}3`} className="answers">{answers[3]}</label>
            <input id={`id ${props.ind}3`} type="radio" className="btn" value={answers[3]} name={`answers ${props.ind}`}/>
            <hr />
        </div>
        )
    }
