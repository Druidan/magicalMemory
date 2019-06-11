import React, { Component } from "react";
import Card from '../components/Card';
import API from '../utils/API';
import { hasClass, addClass, shuffle, removeClass } from '../utils/elcFunctions'
import EndGameModal from "../components/EndGame";
import '../styles/GameBoard.css'

export default class GamePage extends Component {
state = {
    cardPages: 1,
    pagesChecked: false,
    cardArr: [],
    difficulty: 'easy',
    tries: 4,
    remainingCards: 100,
    choice1: '',
    choice2: '',
    noTouchy: false,
    morePlay: false,
    wins: 0,
    losses: 0,
}

componentDidMount() {
    this.props.toggleGame();
    this.setState({
        noTouchy: false,
    })
    this.getPages();
}

getPages = () => {
    API.pageTotal()
    .then( res => 
        this.setState({
            cardPages: (Math.floor(Math.random() * (res.data.total_cards + 1)/175)),
            pagesChecked: true,
        })
    )
    .then( res => {
        if(this.state.pagesChecked){
            this.getCardsDefault();
        }
    })
    .catch(err => {
        console.log("Um, sir, there is a problem with getting the page total...")
        console.log(err)
    });
}

getCardsDefault = () => {
    API.getCards(this.state.cardPages)
    .then(res => {
        const cards = res.data.data;
        let i;
        switch(this.state.difficulty) {
            case 'easy' : 
                i = 6;
                break;
            case 'standard' : 
                i = 12;
                break;
            case 'hard' : 
                i = 24;
                break;
            default:
                break;
        };
        let cardArr = [];
        while (i > 0) {
            let randomCard = cards[Math.floor(Math.random() * (cards.length + 1))];
            if(randomCard !== undefined) {
                if (!cardArr.includes(randomCard)) {
                    if(!randomCard.image_uris.normal) {
                        randomCard.image_uris.normal = randomCard.card_faces[Math.floor(Math.random() * 2)]
                        console.log(`I changed it to: ${randomCard.image_uris.normal}!`)
                    }
                    cardArr.push(randomCard);
                    i--
                }
            }

        }
        if (i === 0) {
            const finalArr = cardArr.concat(cardArr);
            this.setState({
                cardArr: shuffle(finalArr),
                remainingCards: finalArr.length
            })
        }
    })
}

selectCards = (e) => {
    // If the cards are allowed to be clicked...
    if(!this.state.noTouchy){

        //Establish our clicked card and then, if it is a hidden card and the game is on...
        const selectedCard = e.target.parentNode;
        const cardParent = selectedCard.parentNode
        if(hasClass(selectedCard, 'unSelectedCard') && this.props.gameOn) {

            if(!hasClass(cardParent, 'flipped')) {
                addClass(cardParent, 'flipped');
            }

            // If the first card of a pair hasn't been chosen yet, the clicked card is identified as the first choice.
            if(this.state.choice1 === ''){
                this.setState({
                    choice1: selectedCard.firstElementChild.src
                })
                addClass(selectedCard, 'selectedCard');
                removeClass(selectedCard, 'unSelectedCard');

            // If the first card has been chosen, this card becomes the second choice card.
            } else if (this.state.choice1 !== '' && this.state.choice2 === '') {
                this.setState({
                    choice2: selectedCard.firstElementChild.src
                })
                addClass(selectedCard, 'selectedCard');
                removeClass(selectedCard, 'unSelectedCard');

                // We then check to see if the pair of cards matches or not. If they do, mark both as finished cards.
                if(this.state.choice1 === selectedCard.firstElementChild.src) {
                    const revealedCards = document.querySelectorAll('div.selectedCard')
                    revealedCards.forEach(card => {
                        console.log(card.firstElementChild.src)
                        if(card.firstElementChild.src === selectedCard.firstElementChild.src){
                            card.lastElementChild.src = selectedCard.firstElementChild.src
                        }
                        console.log(card.lastElementChild)
                        if(!hasClass(card, 'finishedCard')){
                            addClass(card, 'finishedCard');
                        }
                    });
                    //Reset the card choices, reduce the number of remaining cards, and if those were the last cards, commence the endgame.
                    this.setState({
                        choice1: '',
                        choice2: '',
                        remainingCards: this.state.remainingCards-2
                    }, () => {
                        if(this.state.remainingCards === 0) {
                            this.setState({
                                wins: this.state.wins+1
                            }, () => {
                                this.endGame();
                            })

                        }
                    })

                // If the cards don't match, reduce the remaining tries the player has, and prevent the player from clicking another card until this check resolves. 
                } else {
                    this.setState({
                        tries: this.state.tries-1,
                        noTouchy: true
                    }, () => {
                        // If the remaining total of tries is zero, commence the endgame.
                        if(this.state.tries === 0) {
                            this.setState({ 
                                morePlay: true,
                                losses: this.state.losses+1
                            }, () => {
                                console.log('I\'m comencing the endgame!')
                                this.endGame();
                            })
                        }
                    })
                    // After a short delay so the player can see both mismatched cards they chose, flip the cards back over, deselect them, and allow the player to click cards again.
                    setTimeout( () => {
                        const revealedCards = document.querySelectorAll('div.selectedCard')
                        revealedCards.forEach(card => {
                            if(!hasClass(card, 'finishedCard')) {
                                removeClass(card, 'selectedCard');
                                addClass(card, 'unSelectedCard');
                            }
                            if(hasClass(card.parentNode, 'flipped') && !hasClass(card, 'finishedCard')) {
                                removeClass(card.parentNode, 'flipped');
                            }
                        });
                        this.setState({
                            choice1: '',
                            choice2: '',
                            noTouchy: false
                        })
                    }, 1500);
                }
            }
        }
    }
}

endGame = () => {
    this.props.toggleGame();
}

resetGame = (e) => {
    console.log('I\'m resetting!')
    this.setState({
        cardPages: 1,
        pagesChecked: false,
        cardArr: [],
        difficulty: 'easy',
        tries: 4,
        remainingCards: 100,
        choice1: '',
        choice2: '',
        noTouchy: false
    }, () => {
        this.props.toggleGame();
        this.getPages();
    }) 
}

render() {
    let cardId = 0;
    return (
        <div className='metaBoard'>
            <section className='gameBoard'>
                <h1 className='winsNlosses wins'>Wins: {this.state.wins}</h1><h1 className='remainingText'>Remaining Tries: {this.state.tries}</h1><h1 className='winsNlosses losses'>Losses: {this.state.losses}</h1>
                <div className='cardsDiv'>
                    {this.state.cardArr.map(card => (
                        <Card {...this.props} 
                            key={cardId++}
                            src={card.image_uris.normal}
                            selectCard={this.selectCards}
                        />
                    ))}
                </div>
            </section>
            {!this.props.gameOn ? <EndGameModal {...this.props}
                gameOn={this.props.gameOn}
                tries={this.state.tries}
                morePlay={this.state.morePlay}
                resetGame={this.resetGame}
            /> : <p></p>}
        </div>
    )
}

};