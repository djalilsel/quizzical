import React from "react";
import './Quest.css'

export default function Quest(props) {
    
    return (
        <div className="question--container">
            {props.specialdecode()}
        </div>
        )
} 