
import { useState, useEffect } from 'react'
import Quest from './Quest'
import { decode } from 'html-entities'
import { nanoid } from 'nanoid'
import './Main.css'

export default function Main(props) {

  let i = 0
  let answers

  const [page, setPage] = useState(1)
  const [pageWidth, setPageWidth] = useState(window.innerWidth)
  const [pageHeight, setPageHeight] = useState(window.innerHeight)
  const [data, setData] = useState([])
  const [finalScreen, setFinalScreen] = useState(false)

  
  useEffect(() => {
    setData(props.data)
  }, [page])

  useEffect(() => {
    window.addEventListener("resize", () => {
      setPageWidth(window.innerWidth)
    })
  }, [])

  useEffect(() => {
    
    if(i === 0){
      window.addEventListener("resize", () => {
        setPageHeight(window.innerHeight)
        i++
      })
    }
  }, [])

  
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



  let Questions = data.map((data, index) => {
    return(
        <Quest 
        key={nanoid()} 
        correct={data.correct_answer} 
        answers={() => getAnswerslist(index, data.incorrect_answers, data.correct_answer)} 
        quesions={() => specialdecode(data.question)} 
        />
        )
    })
  
  return (
    page === 1 ? 
      <main style={{height:`${innerHeight}px`}}>
        <div className='first--container'>
          <h1>Quizzi cal</h1>
          <p>Just a simple Quiz Game don't over think it</p>
          <button className='start--btn' onClick={startquiz}>Start quiz</button>
        </div>
        <div className="shape1"></div>
        <div className="shape2" style={{top:`${innerHeight - 100}px`, right:`${innerWidth - 150}px`}}></div>
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
      <div className="shape1"></div>
      <div className="shape2" style={{top:`${innerHeight - 100}px`, right:`${innerWidth - 150}px`}}></div>
    
    </div>
    
  )
}