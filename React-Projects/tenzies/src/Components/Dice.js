import React from "react";

import "./style.css"

export default function Dice(props){

    const styles = {
        backgroundColor : props.isHeld ? "#59E391" :"white"
    }
   
   
    return (
        <div className="dice-face" style={styles} onClick={props.holdDice}>

            <h2 className="die-num">{props.value}</h2>

        </div>
    )
}