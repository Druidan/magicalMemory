import React, { Component } from "react";
import '../styles/Card.css'

export default class Card extends Component {
    state = {
        selected: false,
    }

    render() {
        return (
            <div className='mtgCards'>
                <div className='innerMtgCards unSelectedCard' onClick={this.props.selectCard}>
                    <img className='allcards cardFront' src={this.props.src} alt='Magic the Gathering game card.' ></img>
                    <img className='allcards cardBack' src='/images/mtgBack.jpg' alt='Magic the Gathering game card.' onClick={this.props.selectCard}></img>
                </div>
            </div>
            
        ) 
    }
};