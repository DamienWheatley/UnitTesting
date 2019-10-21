const { setWorldConstructor } = require('cucumber');

const app = require('../../src/app');
const gameState = require('../../src/league');

// Create a 'Game World' that has a game already set up for our tests
class GameWorld {
  constructor () {
    this.game = app.startGame(gameState.createLeague());
  }
}

setWorldConstructor(GameWorld);
