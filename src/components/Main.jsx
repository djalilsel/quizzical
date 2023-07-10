
import { useState, useEffect } from 'react'
import Quest from './Quest'
import Shapes from './Shapes'
import { decode } from 'html-entities'
import { nanoid } from 'nanoid'
import './Main.css'

export default function Main(props) {

  let i = 0
  let answers
  let arrayTest = []

  const [finalScreen, setFinalScreen] = useState(false)
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])
  const [correction, setCorrection] = useState([])
  const [userAnswer, setUserAnswer] = useState([])
  



  useEffect(() => {
    setData(props.data)
  }, [page])


  
  function startquiz(){
    setPage(2)
  }

  function specialdecode(quest){
    let decoded
    if(quest.includes('&')){

      const firstSplit = quest.split('&')
      const secondSplit = firstSplit[1]?.split(";")  
      decoded = firstSplit[0] + decode(`&${secondSplit[0]};`) + secondSplit[1]
      
      if(firstSplit[2] !== undefined){
        const thirdSplit = firstSplit[2].split(';')
        decoded = decoded + decode(`&${thirdSplit[0]};`) + thirdSplit[1]
      }
    }
    else{
      decoded = quest
    }
    return(decoded)
  }
  

  

  function getAnswerslist(index, incorrect, correct){
    const answers = [...incorrect]
    
    answers.splice(props.randIndex[index], 0, correct)
    
    let decodedAnswers = []
    for(let j = 0; j<4; j++){
      decodedAnswers[j] = specialdecode(answers[j])
    }
    decodedAnswers.push(props.randIndex)
    return (decodedAnswers)
    
  }

  
  

  function finalstage(){

    
    
    for( let e = 0; e < 5; e++ ){
      arrayTest[e] = userAnswers[e] === "" ?  false : true
    }
    if(arrayTest.every(value => value === true)){
      for( let r = 0; r < 5; r++ ){
        const value = props.randIndex[r] === userAnswers[r] ?  true : false
        setCorrection(prevCorrection => {
          return ([...prevCorrection, value])
        })
      }
      
      setUserAnswer(userAnswers)
      setFinalScreen(true)
    }
    else{
      console.log("Answer them all")
    }
    
  }
  let userAnswers = ["", "", "", "", ""]
  
  function setUserAnswers(answer, index){
    userAnswers[index] = answer
  }
  

  

    
    
    const Questions = data.map((datas, index) => {
        if(finalScreen){
          return(
            <Quest 
              key={nanoid()}
              ind={index}
              answers={() => getAnswerslist(index, datas.incorrect_answers, datas.correct_answer)} 
              quesions={() => specialdecode(datas.question)}
              sendAnswers={(one, another) => setUserAnswers(one, another)}
              finalScreen={finalScreen}
              correction={correction}
              userAnswers={userAnswer}
            />
          )
        }
        else{
          return(
            <Quest 
              key={nanoid()} 
              ind={index}
              answers={() => getAnswerslist(index, datas.incorrect_answers, datas.correct_answer)} 
              quesions={() => specialdecode(datas.question)} 
              sendAnswers={(one, another) => setUserAnswers(one, another)}
              finalScreen={finalScreen}
            />
          )}
      })
    

    
  
  
  return (
    page === 1 ? 
      <main style={{height:`${innerHeight}px`}}>
        <div className='first--container'>
          <h1>Quizzi cal</h1>
          <p>Just a simple Quiz Game don't over think it</p>
          <button className='start--btn' onClick={startquiz}>Start quiz</button>
        </div>
        <Shapes />
      </main>
    : 
    <div className="second--container" style={{height:`${innerHeight}px`}}>
      <div className='questions--container'>
        {Questions}
      </div>
      <div className="bottom--container">
        {finalScreen && <p className='correctanswers'>You got 0/5 answers right</p>}
        <button className='submit--btn' onClick={finalstage}>Submit</button>
      </div>
      <Shapes />
    </div>
    
  )
}