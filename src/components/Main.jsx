
import { useState, useEffect, useRef, memo, useMemo, useCallback } from 'react'
import Quest from './Quest'
import Shapes from './Shapes'
import { decode } from 'html-entities'
import { nanoid } from 'nanoid'
import './Main.css'

export default function Main(props) {

  let i = 0
  let answers

  const [page, setPage] = useState(1)
  const [data, setData] = useState([])
  const [finalScreen, setFinalScreen] = useState(false)


  //
    
  //


  useEffect(() => {
    setData(props.data)
  }, [page])


  console.log("Main rendered")
  
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
    console.log("You just submited ur answers Thank YOU!!!")
  }

  

  

  function saveState(){
    console.log("hello")
  }

    
    
    const rundermyshit = useCallback(() => {
      
      return data.map((datas, index) => {
        return(
          <Quest 
            key={nanoid()} 
            correct={datas.correct_answer} 
            answers={() => getAnswerslist(index, datas.incorrect_answers, datas.correct_answer)} 
            quesions={() => specialdecode(datas.question)} 
            page={page}
            class={(clas) => saveState(clas)}
          />
        )})
    }
    )
    
    const Questions = useMemo(rundermyshit)

    
  
  
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