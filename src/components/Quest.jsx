import React from "react";
import './Quest.css'

export default function Quest(props) {
    
    const answers = props.answers()

    return (
        <div className="question--container">
            <h2>
                {props.quesions()}
            </h2>

            <input id={`id ${props.ind}0`} type="radio" className="btn" value={answers[0]} name={`answers ${props.ind}`}/>
            <label htmlFor={`id ${props.ind}0`}>{answers[0]}</label>
            <input id={`id ${props.ind}1`} type="radio" className="btn" value={answers[1]} name={`answers ${props.ind}`}/>
            <label htmlFor={`id ${props.ind}1`}>{answers[1]}</label>
            <input id={`id ${props.ind}2`} type="radio" className="btn" value={answers[2]} name={`answers ${props.ind}`}/>
            <label htmlFor={`id ${props.ind}2`}>{answers[2]}</label>
            <input id={`id ${props.ind}3`} type="radio" className="btn" value={answers[3]} name={`answers ${props.ind}`}/>
            <label htmlFor={`id ${props.ind}3`}>{answers[3]}</label>
        </div>
        )
    }
