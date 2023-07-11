import React, { useEffect, useState} from "react";

import './Quest.css'

export default function Quest(props) {
    

    let answers = props.answers()
    const correctIndex = answers[4]
    answers.pop()

    const [class1, setClass1] = useState("answers")
    const [class2, setClass2] = useState("answers")
    const [class3, setClass3] = useState("answers")
    const [class4, setClass4] = useState("answers")

    function clicked(index){

        if(index === 0){
            setClass1("answers selected")
            setClass2("answers")
            setClass3("answers")
            setClass4("answers")
        }
        else if(index === 1){
            setClass2("answers selected")
            setClass1("answers")
            setClass3("answers")
            setClass4("answers")
        }
        else if(index === 2){
            setClass3("answers selected")
            setClass1("answers")
            setClass2("answers")
            setClass4("answers")
        }
        else if(index === 3){
            setClass4("answers selected")
            setClass1("answers")
            setClass2("answers")
            setClass3("answers")
        }
        props.sendAnswers(index, props.ind)
    }
    useEffect(() => {
        if(props.finalScreen){
            const corrIndex = Number(correctIndex[props.ind])
            if(props.correction[props.ind] === true){
                if(corrIndex === 0){
                    setClass1("answers correct")
                }
                else if(corrIndex === 1){
                    setClass2("answers correct")
                }
                else if(corrIndex === 2){
                    setClass3("answers correct")
                }
                else if(corrIndex === 3){
                    setClass4("answers correct")
                }
            } else{
                if(props.userAnswers[props.ind] === 0){
                    setClass1("answers wrong")
                }
                else if(props.userAnswers[props.ind] === 1){
                    setClass2("answers wrong")
                }
                else if(props.userAnswers[props.ind] === 2){
                    setClass3("answers wrong")
                }
                else if(props.userAnswers[props.ind] === 3){
                    setClass4("answers wrong")
                }
                if(corrIndex === 0){
                    setClass1("answers correct")
                }
                else if(corrIndex === 1){
                    setClass2("answers correct")
                }
                else if(corrIndex === 2){
                    setClass3("answers correct")
                }
                else if(corrIndex === 3){
                    setClass4("answers correct")
                }
            }
        }
    }, [])


    return (
        <div className="questions--container">
            
            <h2 className="questions">
                {props.quesions()}
            </h2>
            <div className={`${class1}`} onClick={() => {if(!props.finalScreen){clicked(0)}}}>{answers[0]}</div>
            <div className={`${class2}`} onClick={() => {if(!props.finalScreen){clicked(1)}}}>{answers[1]}</div>
            <div className={`${class3}`} onClick={() => {if(!props.finalScreen){clicked(2)}}}>{answers[2]}</div>
            <div className={`${class4}`} onClick={() => {if(!props.finalScreen){clicked(3)}}}>{answers[3]}</div>
            <hr />
            
        </div>
        )
        
    }
