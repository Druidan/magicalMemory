import React from "react";
import '../styles/Card.css'

export default function Card(props) {
    return (
        <img className='mtgCards' src={props.src}></img>
    )    
};