import React from 'react'
import Main from './components/Main'
import './App.css'

function App() {

  let randIndex = []
  

    const [data, setData] = React.useState([])
    const [playAgain, setPlayAgain] = React.useState(false)
    const [pagee, setPagee] = React.useState(1)
  
    React.useEffect(() => {
      fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then(res => res.json())
      .then(datas => setData(datas.results))
      
    }, [playAgain])


    for(let j = 0; j < 5; j++){
      randIndex[j] = Math.floor(Math.random() * 4)
    }

    function setStates(){
      setPlayAgain(prevPlayAgain => (!prevPlayAgain))
      setPagee(2)
    }
    
    



    return(
      <Main 
        data={data} 
        randIndex={randIndex} 
        playAgain={setStates} 
        pagee={pagee}
      />)
}

export default App
