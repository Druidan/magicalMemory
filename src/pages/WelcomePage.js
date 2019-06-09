import React, { Component } from "react";
import '../styles/Welcome.css';
import PlayBtns from '../components/PlayBtns';

export default class WelcomePage extends Component {

componentDidMount() {

}

render() {
    return (
        <header className='introHeader'>
            <img src='/images/memorysjourney.jpg' className='memoryPic' alt="Memory's Journey Card"></img>
            <h2 className='introLead'><i>Do you have a Magical Memory?</i></h2>
            <p className='introText'>
                Welcome to Magical Memory, a fan-made memory matching game based on Magic the Gathering, powered by the API at <a href='https://scryfall.com/' target='_blank' rel='noopener noreferrer' className='scryfallLink'>Scryfall.com</a><br></br>
                You will be presented with a selection of face-down magic the gathering cards. Whenever you click a card, it will turn face up and you get the chance to click another card. When you click on another face-down card, if it matches your previous card, they both stay face-up, but if they do not match they will both flip back over. You continue to play until you have either successfully turned all of the cards face-up or until you have failed to find a match for three tries. <br></br>
                When you click the "Play" button below, the game will start. Good Luck!
            </p>
            <PlayBtns />
        </header>
        
    )
}

};