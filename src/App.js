import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import GamePage from './pages/GamePage';
import EmptyPage from './pages/EmptyPage';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import './styles/App.css';

export default class App extends Component {
state = {
  gameOn: false,
}

toggleGame = () => {
  this.setState({ gameOn: !this.state.gameOn})
}

render() {
    return (
    <Router>
      <main className='newBody'>
        <Navbar />
        <Switch>
          <Route 
            exact path="/" render={(props) => 
              <WelcomePage {...props} 
                gameOn={this.state.gameOn} 
                toggleGame={this.toggleGame}
              />} 
          />
          <Route 
            exact path="/welcome" render={(props) => 
              <WelcomePage {...props} 
                gameOn={this.state.gameOn} 
                toggleGame={this.toggleGame}
              />} 
          />
          <Route 
            exact path="/magicalmemory" render={(props) => 
              <GamePage {...props} 
                gameOn={this.state.gameOn} 
                toggleGame={this.toggleGame}
              />} 
          />
          <Route 
            component={EmptyPage} 
          />
        </Switch>
        <Footer />
      </main>
    </Router>
  );
}

}