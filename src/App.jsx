import React from 'react'
import Main from './components/Main'
import './App.css'

function App() {

  let randIndex = []
  

    const [data, setData] = React.useState([])
  
    React.useEffect(() => {
      fetch("https://opentdb.com/api.php?amount=5&category=22&type=multiple")
      .then(res => res.json())
      .then(data => setData(data.results))
      
    }, [])

    for(let j = 0; j < 5; j++){
      randIndex[j] = Math.floor(Math.random() * 4)
    }

    return(
      <Main data={data} randIndex={randIndex}/>
    )
}

export default App
