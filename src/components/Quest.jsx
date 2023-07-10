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
    
    if(index === 1){
        setClass1("answers selected")
        setClass2("answers")
        setClass3("answers")
        setClass4("answers")
    }
    else if(index === 2){
      setClass2("answers selected")
      setClass1("answers")
      setClass3("answers")
      setClass4("answers")
  }
  else if(index === 3){
      setClass3("answers selected")
      setClass1("answers")
      setClass2("answers")
      setClass4("answers")
  }
  else if(index === 4){
      setClass4("answers selected")
      setClass1("answers")
      setClass2("answers")
      setClass3("answers")
  }
}
    
    

 

    return (
        <div className="questions--container">
            
            <h2 className="questions">
                {props.quesions()}
            </h2>
            <div className={`${class1}`} onClick={() => clicked(1)}>{answers[0]}</div>
            <div className={`${class2}`} onClick={() => clicked(2)}>{answers[1]}</div>
            <div className={`${class3}`} onClick={() => clicked(3)}>{answers[2]}</div>
            <div className={`${class4}`} onClick={() => clicked(4)}>{answers[3]}</div>
            <hr />
            
        </div>
        )
        
    }
