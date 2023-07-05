
import { useState, useEffect } from 'react'
import Quest from './Quest'
import { decode } from 'html-entities'
import { nanoid } from 'nanoid'
import './Main.css'

export default function Main(props) {

  let i = 0
  const [page, setPage] = useState(1)
  const [pageWidth, setPageWidth] = useState(window.innerWidth)
  const [pageHeight, setPageHeight] = useState(window.innerHeight)
  const [data, setData] = useState([])


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

  
  console.log(data)

  function startquiz(){
    setPage(2)
  }

  function specialdecode(quest){
    console.log(quest)
    JSON.stringify(quest)
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

  

  function getAnswerslist(incorrect, correct){
    const answers = [...incorrect]
    const randIndex = Math.floor(Math.random() * 4)
    answers.splice(randIndex, 0, correct)
    let decodedAnswers = []
    for(let j = 0; j<4; j++){
      decodedAnswers[j] = specialdecode(answers[j])
    }
    return (decodedAnswers)
  }

  const Questions = data.map((data, index) => {

    return(
      <Quest 
      key={nanoid()} 
      ind={index} 
      data={data} 
      answers={() => getAnswerslist(data.incorrect_answers, data.correct_answer)} 
      quesions={() => specialdecode(data.question)} />
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
    <div className="second--container">
      <div>
        {Questions}
      </div>
      <div className="shape1"></div>
      <div className="shape2" style={{top:`${innerHeight - 100}px`, right:`${innerWidth - 150}px`}}></div>
    
    </div>
    
  )
}