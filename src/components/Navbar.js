import React from "react";
import '../styles/Navbar.css'

function Navbar() {
    return (
        <nav className='navBar'>
            <h1 className='homeCorner'><a href='https://edwardcheever.herokuapp.com' target='_blank'>Home</a></h1>
            <h1 className='titleText'>Magical Memory</h1>
            <h3 className='tagLine'>A Magic the Gathering Matching Memory Game</h3>
            <h1 className='mainMenuExit'><a href='/welcome'>Main Menu</a></h1>
        </nav>
    
    );
}

export default Navbar;