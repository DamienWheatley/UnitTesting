const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;

const gameState = require('../src/league');

describe('league', function () {
  let league;
  describe('#addPlayer', function () {
    beforeEach(function () {
      league = gameState.createLeague();
    });
    it('adds a player to the game', function () {
      league.addPlayer('Bob');

      const players = league.getPlayers();

      expect(players).to.have.lengthOf(1);
      expect(players[0]).to.have.members(['Bob']);
    });
    it('puts the new player last', function () {
      league.addPlayer('Bob');
      league.addPlayer('Elliot');
      league.addPlayer('Perry');
      league.addPlayer('JD');
      league.addPlayer('Turk');
      
      league.addPlayer('Carla');
      const players = league.getPlayers();

      expect(players[2]).to.have.members(['JD','Turk','Carla']);
    });
    it('does not accept special characters', function () {
      assert.Throw(function (){league.addPlayer('Janitor?')},'Player name Janitor? contains invalid characters');    
    });
    it('does not accept duplicate names', function (){
      league.addPlayer('Bob');

      assert.Throw(function(){ league.addPlayer('Bob')},"Cannot add player \'Bob\' because they are already in the game");
    });
  });

  describe('#getPlayers', function () {
    beforeEach(function () {
      league = gameState.createLeague();
    });
    it('prints winner first', function () {
      league.addPlayer('Bob');
      league.addPlayer('John');
      league.recordWin('John','Bob');
      
      const players = league.getPlayers();

      expect(players[0]).to.have.members(['John']);
      expect(players[1]).to.have.members(['Bob']);
    });
  });

  describe('#recordWin', function () {
    beforeEach(function () {
      league = gameState.createLeague();
    });
    it('swaps player up if challenger wins', function () {
      league.addPlayer('Bob');
      league.addPlayer('Elliot');
      league.recordWin('Elliot','Bob');
      
      const players = league.getPlayers();

      expect(players[0]).to.have.members(['Elliot']);
      expect(players[1]).to.have.members(['Bob']);
    });
    it('cannot challenge someone lower in the table', function () {
      league.addPlayer('Bob');
      league.addPlayer('Elliot');
      league.addPlayer('Perry');
      league.addPlayer('JD');
      league.addPlayer('Turk');

      assert.Throw(function () {league.recordWin('Bob','Perry')},"Cannot record match result. Winner \'Bob\' must be one row below loser \'Perry\'");
    });
    it('cannot challenge someone two rows higher in the table', function () {
      league.addPlayer('Bob');
      league.addPlayer('Elliot');
      league.addPlayer('Perry');
      league.addPlayer('JD');
      league.addPlayer('Turk');

      assert.Throw(function () {league.recordWin('Turk','Bob')},"Cannot record match result. Winner \'Turk\' must be one row below loser \'Bob\'");
    });
  });

  describe('#getWinner', function () {
    beforeEach(function () {
      league = gameState.createLeague();
    });
    it('gets the player in first place', function() {
      league.addPlayer('Bob');
      league.addPlayer('Elliot');
      league.addPlayer('Perry');
      league.addPlayer('JD');
      league.addPlayer('Turk');
      league.recordWin('Perry','Bob');

      const winner = league.getWinner();

      expect(winner).to.equal('Perry');
    });
  });
});
