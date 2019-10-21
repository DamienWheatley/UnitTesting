const chai = require('chai');
const expect = chai.expect;

const gameState = require('../src/league');
const leagueRenderer = require('../src/league_renderer');

describe('leagueRenderer', function () {
  it('states that the league is empty', function () {
    const league = gameState.createLeague();
    const rendered = leagueRenderer.render(league);
    expect(rendered).to.equal('No players yet');
  });
});
