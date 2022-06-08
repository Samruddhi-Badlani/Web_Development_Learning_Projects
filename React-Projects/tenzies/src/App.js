import logo from './logo.svg';
import './App.css';
import Dice from './Components/Dice';
import React from 'react';
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
function App() {

  const [dice,setDice] = React.useState(allNewDice());

  const [tenzies,setTenzies] = React.useState(false)

  React.useEffect(()=>{

    console.log("dice state changed")

    console.log(dice)
    const allHeld = dice.every(die => die.isHeld);


    const firstValue = dice[0].value
    //console.log("first value =  ",firstValue)
    const allSame =dice.every(die=>{ 
     // console.log("current value ",die.value)
      return die.value === firstValue
    });

    if(allHeld && allSame){

      setTenzies(true)
      console.log("You win");
    }
    else{
      console.log("Play more to win")
    }

   

   

  },[dice])

  function generateNewDie(){
    return {
      value:Math.ceil(Math.random() * 6),
       isHeld : false,
       id:nanoid()
    }
  }

  

  

  function allNewDice(){
    const diceBoxes = [];

    for(let i=1; i <= 10 ;i++){
      diceBoxes.push(generateNewDie()
      )
    }
    return diceBoxes
  }
  const diceElements = dice.map(die => {
    return <Dice value={die.value} key={die.id} isHeld={die.isHeld} id={die.id} holdDice={() => holdDice(die.id)}/>
  })


  function rollDice() {

    if(!tenzies){
    setDice(oldDice => oldDice.map(die =>{
      return die.isHeld ? die : generateNewDie()
    }));
  }
  else{
    setTenzies(false)
    setDice(allNewDice())
  }
  }

 

  function holdDice(id) {

    console.log(id , "hello yar");



    setDice(oldDice => oldDice.map(dice =>{
      
      
      return dice.id === id ? {...dice,isHeld:!dice.isHeld} : dice
      
    }))

   

    

  }

 
  return (
    <div className="container">
   <main>

   {tenzies && <Confetti />}

   <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
     <div className='dice-grid'>
       {diceElements}
      

       
     </div>
     <button 
                className="roll-dice" 
                onClick={rollDice}
            >
                {tenzies ? "New Game" : "Roll"}
            </button>

    
   </main>
   </div>
  );
}

export default App;
