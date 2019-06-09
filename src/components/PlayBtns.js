import React from "react";
import { Link } from 'react-router-dom'
import '../styles/PlayBtns.css';

export default class PlayBtns extends React.Component {


render() {
    if(!this.props.gameOn){
        return (
            <a href={'/magicalmemory'}>
                <span className="play-btn" role='button'>
                    Play
                </span>
            </a>
        )
    } else {

    }
}
    

};