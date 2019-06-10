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
                    <dialog open>
                            {this.props.tries > 0 && !this.props.gameOn ? 
                                <div className='winnerDiv'>
                                    <p>You Won!</p>
                                    <PlayBtns {...this.props}
                                        gameOn={this.props.gameOn}
                                        morePlay={!this.state.morePlay}
                                        resetGame={this.props.resetGame}
                                    />
                                </div> :
                                <div className='loserDiv'>
                                    <p>You Lost!</p>
                                    <PlayBtns {...this.props}
                                        gameOn={this.props.gameOn}
                                        morePlay={this.props.morePlay}
                                        resetGame={this.props.resetGame}
                                    />
                                </div>
                            }
                    </dialog> 
                : <dialog></dialog>}
            </div>
    
        )}
};