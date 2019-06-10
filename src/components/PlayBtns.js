import React from "react";
import { Link } from 'react-router-dom';
import '../styles/PlayBtns.css';

export default class PlayBtns extends React.Component {


render() {
    return (
        <div className='btnWrapper'>
            {!this.props.morePlay ?
                <a href={'/magicalmemory'}>
                    <span className="play-btn" role='button'>
                        Play!
                    </span>
                </a> :
                <div className='btnDiv'>
                    <Link to={'/magicalmemory'}>
                        <button className="reset-btn" onClick={this.props.resetGame}>
                            Play Again!
                        </button>
                    </Link>
                    <Link to={'/welcome'}>
                        <button className="returnhome-btn" onClick={this.props.resetGame}>
                            Main Menu
                        </button>
                    </Link>
                </div>
            } 
        </div>
        
    )
}
};