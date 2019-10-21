const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;

const gameState = require('../src/league');

describe('league', function () {
  describe('#addPlayer', function () {
    it('adds a player to the game', function () {
      const league = gameState.createLeague();
      league.addPlayer('Bob');

      const players = league.getPlayers();

      expect(players).to.have.lengthOf(1);
      expect(players[0]).to.have.members(['Bob']);
    });
  });

  describe('#getPlayers', function () {
    it('prints winner first', function () {
      const league = gameState.createLeague();
      league.addPlayer('Bob');
      league.addPlayer('John');
      league.recordWin('John','Bob');
      
      const players = league.getPlayers();

      expect(players[0]).to.have.members(['John']);
      expect(players[1]).to.have.members(['Bob']);
    });
    it('checks there are players', function () {
      const league = gameState.createLeague();

      const players = league.getPlayers();

      expect(players[0]).to.equal('No players yet');
    })
  });

  describe('#recordWin', function () {
    it('swaps player up if challenger wins', function () {
      const league = gameState.createLeague();
      league.addPlayer('Bob');
      league.addPlayer('Elliot');
      league.recordWin('Elliot','Bob');
      
      const players = league.getPlayers();

      expect(players[0]).to.have.members(['Elliot']);
      expect(players[1]).to.have.members(['Bob']);
    });
    it('cannot challenge someone lower in the table', function () {
      const league = gameState.createLeague();
      league.addPlayer('Bob');
      league.addPlayer('Elliot');
      league.addPlayer('Perry');
      league.addPlayer('JD');
      league.addPlayer('Turk');

      assert.Throw(function () {league.recordWin('Bob','Perry')},"Cannot record match result. Winner \'Bob\' must be one row below loser \'Perry\'");
    });
  });

  describe('#getWinner', function () {
    it('gets the player in first place', function() {
      const league = gameState.createLeague();
      league.addPlayer('Bob');
      league.addPlayer('Elliot');
      league.addPlayer('Perry');
      league.addPlayer('JD');
      league.addPlayer('Turk');
      league.recordWin('Perry','Bob')

      const winner = league.getWinner();

      expect(winner).to.equal('Perry');
    });
  });
});
