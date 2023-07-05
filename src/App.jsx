import { useState, useEffect } from 'react'
import Quest from './components/Quest'
import { decode } from 'html-entities'
import { nanoid } from 'nanoid'
import './App.css'

function App() {

  let i = 0
  const [page, setPage] = useState(1)
  const [pageWidth, setPageWidth] = useState(window.innerWidth)
  const [pageHeight, setPageHeight] = useState(window.innerHeight)
  const [questions, setQuestions] = useState([])

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

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&category=22&type=multiple")
    .then(res => res.json())
    .then(data => setQuestions(data.results))
    
  }, [])

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

  function startquiz(){
    setPage(2)
  }
  console.log(questions)
  const Questions = questions.map(data => {
    return(
      <Quest key={nanoid()} specialdecode={() => specialdecode(data.question)} />
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
        <div className="shape2" style={{top:`${innerHeight - 150}px`, right:`${innerWidth - 200}px`}}></div>
      </main>
    : 
    <div className="second--container">
      <h1>Second page</h1>
      <div>
        {Questions}
      </div>
    </div>
    
  )
}

export default App
