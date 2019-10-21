require('mocha-sinon');
const chai = require('chai');
const expect = chai.expect;

const app = require('../src/app');
const gameState = require('../src/league');
const leagueRenderer = require('../src/league_renderer');

describe('app command processing', function () {
  it('prints the current state of the league', function () {
    const league = gameState.createLeague();
    const renderLeague = this.sinon.stub(leagueRenderer, 'render');
    renderLeague.withArgs(league).returns('rendered league');

    const game = app.startGame(league);
    expect(game.sendCommand('print')).to.equal('rendered league');
  });
});
