require('mocha-sinon');
const chai = require('chai');
const expect = chai.expect;

const app = require('../src/app');
const gameState = require('../src/league');
const leagueRenderer = require('../src/league_renderer');
const InvalidArgumentException = require('../src/invalid_argument_exception');
const fileService = require('../src/file_service');

describe('app command processing', function () {
  let league;
  describe('#unknown command', function() {
    beforeEach(function () {
      league = gameState.createLeague();
    });
    it('doesn\'t accept unknown commands', function () {
      const game = app.startGame(league);

      const response = game.sendCommand('unknown command');

      expect(response).to.equal('Unknown command "unknown command"');
    });
  });

  describe('#print', function () {
    beforeEach(function () {
      league = gameState.createLeague();
    });
    it('prints the current state of the league', function () {
      const renderLeague = this.sinon.stub(leagueRenderer, 'render');
      renderLeague.withArgs(league).returns('rendered league');

      const game = app.startGame(league);
      const result = game.sendCommand('print');

      expect(result).to.equal('rendered league');
    });
  });

  describe('#add player <name>', function () {
    beforeEach(function () {
      league = gameState.createLeague();
    });
    it('calls the #addPlayer method', function () {
      //sets up the "fake" league
      const mockLeague = this.sinon.mock(league); 
      //set the expectation when command is sent...
      mockLeague.expects('addPlayer').once();
      //creates the league for real.
      const game = app.startGame(league);
      //...command that is sent to meet expectation.
      expect(game.sendCommand('add player Bob'))
      //verify the expectation is met
      mockLeague.verify();
    });
    it('rejects names with invalid characters', function (){
      const addPlayerStub = this.sinon.stub(league,'addPlayer');

      addPlayerStub.withArgs('Bob?').throws(new InvalidArgumentException('Bad name'));

      const game = app.startGame(league)
      const result = game.sendCommand('add player Bob?');

      expect(result).to.equal('Bad name');
    })
  });

  describe('#record win', function () {
    beforeEach(function () {
      league = gameState.createLeague();
    });
    it('calls the #recordWin method', function () {
      const mockLeague = this.sinon.mock(league);

      mockLeague.expects('recordWin').withArgs('Bob', 'John').once();

      const game = app.startGame(league);
      game.sendCommand('record win Bob John');

      mockLeague.verify();
    });
    it('does not accept invalid wins', function () {
      //set replica method
      const recordWinStub = this.sinon.stub(league,'recordWin');
      //predefine the result with these parameters.
      recordWinStub.withArgs('Bob', 'John').throws(new InvalidArgumentException('bad result'));

      const game = app.startGame(league); //create league
      const result = game.sendCommand('record win Bob John');//send command to get test result  
      
      //expect the result to equal the predefined result
      expect(result).to.equal('bad result'); 

    });
  });

  describe('#winner', function () {
    beforeEach(function () {
      league = gameState.createLeague();
    });
    it('calls the #getWinner method', function () {
      const mockLeague = this.sinon.mock(league);

      mockLeague.expects('getWinner').once()

      const game = app.startGame(league);
      game.sendCommand('winner');

      mockLeague.verify();
    });
    it('shows the current winner', function() {
      const getWinnerStub = this.sinon.stub(league, 'getWinner');

      getWinnerStub.returns('Current winner');

      const game = app.startGame(league);
      const result = game.sendCommand('winner');

      expect(result).to.equal('Current winner');
    });
  });

  describe('#save/load', function () {
    beforeEach(function () {
      league = gameState.createLeague();
    });
    it('calls the save method', function () {
      const saveFileMock = this.sinon.mock(fileService);
      
      saveFileMock.expects('save').withArgs('/filepath/name.json',league);

      const game = app.startGame(league);
      game.sendCommand('save /filepath/name.json');

      saveFileMock.verify();
    });
    it('calls the load method', function() {
      const loadFileMock = this.sinon.mock(fileService);

      loadFileMock.expects('load').withArgs('/filepath/name.json');

      const game = app.startGame(league);
      game.sendCommand('load /filepath/name.json');

      loadFileMock.verify();
    });
  });
});