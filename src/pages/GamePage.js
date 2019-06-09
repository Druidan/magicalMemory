import React, { Component } from "react";
import Card from '../components/Card';
import API from '../utils/API';
import { shuffle } from '../utils/elcFunctions'

export default class GamePage extends Component {
state = {
    cardPages: 1,
    pagesChecked: false,
    cardArr: [],
    difficulty: 'easy',
    tries: 3,
    choice1: '',
    choice2: '',
}

componentDidMount() {
    this.props.toggleGame();
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
            if (!cardArr.includes(randomCard)) {
                cardArr.push(randomCard);
                i--
            }
        }
        if (i === 0) {
            const finalArr = cardArr.concat(cardArr);
            this.setState({
                cardArr: shuffle(finalArr)
            })
        }
    })
}

render() {
    return (
        <section className='gameBoard'>
            <h1 className='remainingText'>Remaining Tries: {this.state.tries}</h1>
            <div className='cardsDiv'>
                {this.state.cardArr.map(card => (
                    <Card {...this.props} 
                        key={card.id+Math.floor(Math.random() * 100)}
                        src={card.image_uris.normal}
                    />
                ))}
            </div>

        </section>


    )
}

};