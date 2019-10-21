const chai = require('chai');
const expect = chai.expect;

const app = require('../../src/app');
const gameState = require('../../src/league');

describe('league app', function () {
  it('prints empty game state', function () {
    const game = app.startGame(gameState.createLeague());

    expect(game.sendCommand('print')).to.equal('No players yet');
  });
});
