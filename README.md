# magicalMemory
A Magic the Gathering card matching memory game.

## Overview and Goals
This app will present the user with a simple memory matching game using cards from Magic the Gathering that will animate and track their progress between games. 

## Deployment 
The game is currently deployed on Heroku - [Magical Memory](https://magicalmemory.herokuapp.com)

## MVP
As the app is run, it must be able to do the following:
* A user must be presented with the ability to start playing the matching game.
* When the player decides to play, the cards must be randomnly placed on the game board upside down.
* The player can flip the cards right-side-up, revealing them. 
* For every pair flipped, if they are a matching pair, they stay face-up and somehow indicate that they are no longer part of the game.
* If they are not a matching pair, the player's number of tries must decrease and the cards must flip face-down again.
* If the player flips all the cards face up before running out of tries, they will have won the game and their wins score must increase. Otherwise their losing score will increase.
* in either a loss or a win, they will be presented with the ability to either play again or return to the welcome screen.

## Dependancies
Our app will be using the following NPM:
* [React](https://reactjs.org/) - Our app is first and foremost a React app, and it's whole structure will be defined as such.
* [React Router](https://www.npmjs.com/package/react-router) - As part of React, we will be using React Router to keep everything on one page.
* [Axios](https://www.npmjs.com/package/axios) - Our app will be making calls to the [Scryfall](https://scryfall.com/docs/api) API for the Magic the Gathering card images we will be using.

## Active Bugs and Issues
* The CSS needs a complete finishing polish sweep. That includes everything from basic font-families and sizes, to backgrounds, etc.

## Future Features
* I want to redesign the welcome page to feel more welcoming.
* I want to add a card flipping sound every time a card flips.
* I want to add difficulty settings, primarily aimed at minorly increasing the number of cards.
* I want to add options, such as using cards from specific sets, or colors, or types.

