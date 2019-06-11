import React, { Component } from "react";
import '../styles/EndGame.css'
import PlayBtns from "./PlayBtns";

export default class EndGameModal extends Component {
    state = {
        isOpen: false
    }

    render() { 
        return (
            <div className='endGameModal'>
                {!this.props.gameOn ? 
                    <div className='endGameDiv'>
                            {this.props.tries > 0 && !this.props.gameOn ? 
                                <div className='winnerDiv'>
                                    <h1 className='endText winnerTxt'>You Won!</h1>
                                    <PlayBtns {...this.props}
                                        gameOn={this.props.gameOn}
                                        morePlay={!this.state.morePlay}
                                        resetGame={this.props.resetGame}
                                    />
                                </div> :
                                <div className='loserDiv'>
                                    <h1 className='endText loserTxt'>You Lost!</h1>
                                    <PlayBtns {...this.props}
                                        gameOn={this.props.gameOn}
                                        morePlay={this.props.morePlay}
                                        resetGame={this.props.resetGame}
                                    />
                                </div>
                            }
                    </div> 
                : <div></div>}
            </div>
    
        )}
};